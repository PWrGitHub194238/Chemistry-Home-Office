import { Component, Inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatIconDictEntry } from "functions/src/models/mat-icon-dict-entry.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AssignmentDictEntry, SubjectDictEntry } from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { HomeworkPath } from "src/app/models";
import { AssignmentRowForm } from "../../models/assignment-row-form.mode";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-homework-path-dialog",
  templateUrl: "./homework-path-dialog.component.html",
  styleUrls: ["./homework-path-dialog.component.scss"]
})
export class HomeworkPathDialogComponent extends BaseTablePanelDialogComponent<
  HomeworkPath
> {
  assignmentColumns = ["no", "name", "icon"];
  assignmentRows: AssignmentRowForm[] = [];

  subjects$: Observable<SubjectDictEntry[]>;
  classes$: Observable<number[]>;

  get active(): FormControl {
    return this.form.get("active") as FormControl;
  }

  get subject(): FormControl {
    return this.form.get("subject") as FormControl;
  }

  get classNo(): FormControl {
    return this.form.get("classNo") as FormControl;
  }

  get topic(): FormControl {
    return this.form.get("topic") as FormControl;
  }

  get assignments(): FormArray {
    return this.form.get("assignments") as FormArray;
  }

  get assignmentsDict(): AssignmentDictEntry[] {
    return this.data["assignmentsDict"] as AssignmentDictEntry[];
  }

  get matIconsDict(): MatIconDictEntry[] {
    return this.data["matIconsDict"] as MatIconDictEntry[];
  }

  constructor(
    private formBuilder: FormBuilder,
    private firestoreDocumentService: FirestoreDocumentService,
    private dictionaryService: DictionaryService,
    dialogRef: MatDialogRef<HomeworkPathDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: HomeworkPath | null;
    }
  ) {
    super(dialogRef, matDialog, data);
    this.subjects$ = this.dictionaryService.getAllSubjects$();
    this.classes$ = this.dictionaryService.getClassesByClassOnly$();
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      active: true,
      subject: ["", Validators.required],
      classNo: ["", Validators.required],
      topic: ["", Validators.required],
      assignments: this.formBuilder.array([])
    });

    this.createNewAssignment();
    this.createNewAssignment();
  }

  loadForm(selectedRow: HomeworkPath) {
    this.form = this.formBuilder.group({
      active: selectedRow.active,
      subject: [selectedRow.subject, Validators.required],
      classNo: [selectedRow.classNo, Validators.required],
      topic: [selectedRow.topic, Validators.required],
      assignments: this.formBuilder.array([])
    });

    selectedRow.assignments.forEach((assignment: AssignmentDictEntry) => {
      this.loadAssignment(assignment);
    });
    this.createNewAssignment();
  }

  buildItem(editMode: boolean, item: HomeworkPath): HomeworkPath {
    return {
      uid: editMode ? item.uid : null,
      active: this.active.value,
      date: editMode ? item.date : new Date(),
      subject: this.subject.value,
      classNo: this.classNo.value,
      topic: this.topic.value,
      assignments: this.assignments.controls
        .slice(0, this.assignments.controls.length - 1)
        .map((assignment: FormGroup) => ({
          uid: assignment.get("uid").value,
          name: assignment.get("name").value,
          icon: this.getIconName(assignment.get("iconIdx").value)
        }))
    };
  }

  performAdd(item: HomeworkPath): Promise<HomeworkPath> {
    return this.firestoreDocumentService.createHomeworkPath(item);
  }

  performEdit(item: HomeworkPath): Promise<HomeworkPath> {
    return this.firestoreDocumentService.editHomeworkPath(item);
  }

  assignmentName(formArrayindex: number): FormControl {
    return this.assignments.at(formArrayindex).get("name") as FormControl;
  }

  assignmentIconIdx(formArrayindex: number): FormControl {
    return this.assignments.at(formArrayindex).get("iconIdx") as FormControl;
  }

  getIconName(iconIdx: number): string {
    return this.matIconsDict[iconIdx].name;
  }

  previousAssignmentIcon(formArrayindex: number) {
    let iconIndex: number = this.assignmentIconIdx(formArrayindex)
      .value as number;

    if (iconIndex === 0) {
      iconIndex = this.matIconsDict.length - 1;
    } else {
      iconIndex -= 1;
    }

    this.setAssignmentIcon(formArrayindex, iconIndex);
  }

  nextAssignmentIcon(formArrayindex: number) {
    let iconIndex: number = this.assignmentIconIdx(formArrayindex)
      .value as number;

    if (iconIndex === this.matIconsDict.length - 1) {
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

  private createNewAssignment() {
    const newGroup: FormGroup = this.formBuilder.group({
      uid: "",
      name: "",
      iconIdx: 0
    });

    this.pushAssignment(newGroup);
  }

  private loadAssignment(assignment: AssignmentDictEntry) {
    const newGroup: FormGroup = this.formBuilder.group({
      uid: assignment.uid,
      name: assignment.name,
      iconIdx: this.matIconsDict.findIndex(
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
        uid: assignmentGroup.get("uid") as FormControl,
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
    return this.assignmentsDict.filter((assignment: AssignmentDictEntry) =>
      assignment.name.toLowerCase().includes(filterValue)
    );
  }

  private removeAssignment(index: number) {
    this.assignmentRows.splice(index, 1);
    this.assignmentRows = [...this.assignmentRows];
    this.assignments.removeAt(index);
  }

  private getIconFromAssignmentName(inputValue: string): number | null {
    const assignment: AssignmentDictEntry = this.assignmentsDict.find(
      (assignment: AssignmentDictEntry) => assignment.name === inputValue
    );

    if (assignment) {
      return this.matIconsDict.findIndex(
        (icon: MatIconDictEntry) => icon.name === assignment.icon
      );
    }

    return null;
  }
}
