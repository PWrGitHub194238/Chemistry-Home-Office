import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatIconDictEntry } from "src/app/core/models";
import { AssignmentDictEntry } from "src/app/core/models/dictionaries/assignment-dict-entry.model";
import { SubjectDictEntry } from "src/app/core/models/dictionaries/subject-dict-entry.model";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { HomeworkPath, Assignment } from "src/app/models";
import { AssignmentRowForm } from "../../models/assignment-row-form.mode";
import { AlertDialog } from "src/app/shared/components/alert-dialog/alert-dialog.model";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";

@UntilDestroy()
@Component({
  selector: "cho-homework-path-dialog",
  templateUrl: "./homework-path-dialog.component.html",
  styleUrls: ["./homework-path-dialog.component.scss"]
})
export class HomeworkPathDialogComponent implements OnInit {
  assignmentColumns = ["no", "name", "icon"];
  assignmentRows: AssignmentRowForm[] = [];
  homeworkPathForm: FormGroup;
  submitted: boolean;

  subjects$: Observable<SubjectDictEntry[]>;
  classes$: Observable<number[]>;

  get active(): FormControl {
    return this.homeworkPathForm.get("active") as FormControl;
  }

  get subject(): FormControl {
    return this.homeworkPathForm.get("subject") as FormControl;
  }

  get classNo(): FormControl {
    return this.homeworkPathForm.get("classNo") as FormControl;
  }

  get topic(): FormControl {
    return this.homeworkPathForm.get("topic") as FormControl;
  }

  get assignments(): FormArray {
    return this.homeworkPathForm.get("assignments") as FormArray;
  }

  get editMode(): boolean {
    return this.data.homeworkPath !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private firestoreDocumentService: FirestoreDocumentService,
    private dictionaryService: DictionaryService,
    private dialogRef: MatDialogRef<HomeworkPathDialogComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      homeworkPath: HomeworkPath | null;
      assignmentsDict: AssignmentDictEntry[];
      matIconsDict: MatIconDictEntry[];
    }
  ) {
    this.subjects$ = this.dictionaryService.getSubjects$();
    this.classes$ = this.dictionaryService.getClassesByClassOnly$();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    if (this.editMode) {
      this.loadForm(this.data.homeworkPath);
    } else {
      this.createNewForm();
    }
  }

  assignmentName(formArrayindex: number): FormControl {
    return this.assignments.at(formArrayindex).get("name") as FormControl;
  }

  assignmentIconIdx(formArrayindex: number): FormControl {
    return this.assignments.at(formArrayindex).get("iconIdx") as FormControl;
  }

  getIconName(iconIdx: number): string {
    return this.data.matIconsDict[iconIdx].name;
  }

  previousAssignmentIcon(formArrayindex: number) {
    let iconIndex: number = this.assignmentIconIdx(formArrayindex)
      .value as number;

    if (iconIndex === 0) {
      iconIndex = this.data.matIconsDict.length - 1;
    } else {
      iconIndex -= 1;
    }

    this.setAssignmentIcon(formArrayindex, iconIndex);
  }

  nextAssignmentIcon(formArrayindex: number) {
    let iconIndex: number = this.assignmentIconIdx(formArrayindex)
      .value as number;

    if (iconIndex === this.data.matIconsDict.length - 1) {
      iconIndex = 0;
    } else {
      iconIndex += 1;
    }

    this.setAssignmentIcon(formArrayindex, iconIndex);
  }

  activeToggle(toggleChange: MatSlideToggleChange) {
    this.active.setValue(toggleChange.checked);
  }

  isPlaceholderForNextAssignment(index: number): boolean {
    return index === this.assignments.length - 1;
  }

  onAssignmentNameInputChange(index: number, inputValue: string) {
    if (inputValue !== "" && this.isPlaceholderForNextAssignment(index)) {
      this.createNewAssignment();
    }

    const iconIdx: number = this.getIconFromAssignmentName(inputValue);

    if (iconIdx) {
      this.assignmentIconIdx(index).setValue(iconIdx);
    }
  }

  onAssignmentNameBlur(index: number, inputValue: string) {
    if (
      inputValue === "" &&
      this.assignments.length != 2 &&
      index <= this.assignments.length - 2
    ) {
      this.removeAssignment(index);
    }
  }

  onAutoCompleteAassignmentSelected(
    index: number,
    event: MatAutocompleteSelectedEvent
  ) {
    this.onAssignmentNameInputChange(index, event.option.value);
  }

  onReset() {
    this.assignmentRows = [];
    this.createForm();
    this.homeworkPathForm.markAsUntouched();
    this.homeworkPathForm.markAsPristine();
  }

  onCancel() {
    if (this.homeworkPathForm.pristine) {
      this.dialogRef.close();
    } else {
      const alertData: AlertDialog = {
        title: "Niezapisane zmiany",
        body: `Czy na pewno chcesz zamknąć okno mimo niezapisanych zmian?`,
        cancelLabel: "Nie, nie zamykaj",
        okLabel: "Tak, zamknij!"
      };
      const dialogRef = this.matDialog.open(AlertDialogComponent, {
        data: alertData
      });

      dialogRef
        .afterClosed()
        .pipe(untilDestroyed(this))
        .subscribe((closeDialog: boolean) => {
          if (closeDialog) {
            this.dialogRef.close();
          }
        });
    }
  }

  async onSubmit() {
    this.homeworkPathForm.markAllAsTouched();
    if (this.homeworkPathForm.valid) {
      let homeworkPath: HomeworkPath = {
        uid: this.data.homeworkPath ? this.data.homeworkPath.uid : "",
        active: this.active.value,
        date: this.editMode ? this.data.homeworkPath.date : new Date(),
        subject: this.subject.value,
        classNo: this.classNo.value,
        topic: this.topic.value,
        assignments: this.assignments.controls
          .slice(0, this.assignments.controls.length - 1)
          .map((assignment: FormGroup) => ({
            name: assignment.get("name").value,
            icon: this.getIconName(assignment.get("iconIdx").value)
          }))
      };

      if (this.editMode) {
        homeworkPath = await this.firestoreDocumentService.editHomeworkPath(
          homeworkPath
        );
      } else {
        homeworkPath = await this.firestoreDocumentService.createHomeworkPath(
          homeworkPath
        );
      }

      if (homeworkPath) {
        this.dialogRef.close();
      }
    }
  }

  private createNewForm() {
    this.homeworkPathForm = this.formBuilder.group({
      active: true,
      subject: ["", Validators.required],
      classNo: ["", Validators.required],
      topic: ["", Validators.required],
      assignments: this.formBuilder.array([])
    });

    this.createNewAssignment();
    this.createNewAssignment();
  }

  private loadForm(homeworkPath: HomeworkPath) {
    this.homeworkPathForm = this.formBuilder.group({
      active: homeworkPath.active,
      subject: [homeworkPath.subject, Validators.required],
      classNo: [homeworkPath.classNo, Validators.required],
      topic: [homeworkPath.topic, Validators.required],
      assignments: this.formBuilder.array([])
    });

    homeworkPath.assignments.forEach((assignment: Assignment) => {
      this.loadAssignment(assignment);
    });
    this.createNewAssignment();
  }

  private createNewAssignment() {
    const newGroup: FormGroup = this.formBuilder.group({
      name: "",
      iconIdx: 0
    });

    this.pushAssignment(newGroup);
  }

  private loadAssignment(assignment: Assignment) {
    const newGroup: FormGroup = this.formBuilder.group({
      name: assignment.name,
      iconIdx: this.data.matIconsDict.findIndex(
        (matIcon: MatIconDictEntry) => matIcon.name === assignment.icon
      )
    });

    this.pushAssignment(newGroup);
  }

  private pushAssignment(assignmentGroup: FormGroup) {
    this.assignmentRows = [
      ...this.assignmentRows,
      {
        filteredAssignments$: assignmentGroup
          .get("name")
          .valueChanges.pipe(
            map((input: string) => this.filterAssignments(input))
          ),
        name: assignmentGroup.get("name") as FormControl,
        iconIdx: assignmentGroup.get("iconIdx") as FormControl
      }
    ];

    this.assignments.push(assignmentGroup);

    if (this.assignments.length >= 2) {
      this.assignmentName(this.assignments.length - 2).setValidators(
        Validators.required
      );
      this.assignmentIconIdx(this.assignments.length - 2).setValidators(
        Validators.required
      );
    }
  }

  private setAssignmentIcon(formArrayindex: number, iconIndex: number) {
    this.assignmentIconIdx(formArrayindex).setValue(iconIndex);
    this.assignmentIconIdx(formArrayindex).markAsDirty();
  }

  private filterAssignments(input: string): AssignmentDictEntry[] {
    const filterValue = input.toLowerCase();

    if (!filterValue) {
      return [];
    }
    return this.data.assignmentsDict.filter((assignment: AssignmentDictEntry) =>
      assignment.name.toLowerCase().includes(filterValue)
    );
  }

  private removeAssignment(index: number) {
    this.assignmentRows.splice(index, 1);
    this.assignmentRows = [...this.assignmentRows];
    this.assignments.removeAt(index);
  }

  private getIconFromAssignmentName(inputValue: string): number | null {
    const assignment: AssignmentDictEntry = this.data.assignmentsDict.find(
      (assignment: AssignmentDictEntry) => assignment.name === inputValue
    );

    if (assignment) {
      return this.data.matIconsDict.findIndex(
        (icon: MatIconDictEntry) => icon.name === assignment.icon
      );
    }

    return null;
  }
}
