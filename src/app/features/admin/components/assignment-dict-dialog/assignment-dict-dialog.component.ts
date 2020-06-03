import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Assignment } from "functions/src/models/assignment.model";
import { MatIconDictEntry } from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-assignment-dict-dialog",
  templateUrl: "./assignment-dict-dialog.component.html",
  styleUrls: ["./assignment-dict-dialog.component.scss"]
})
export class AssignmentDictDialogComponent extends BaseTablePanelDialogComponent<
  Assignment
> {
  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  get icon(): FormControl {
    return this.form.get("icon") as FormControl;
  }

  get matIconsDict(): MatIconDictEntry[] {
    return this.data["matIconsDict"] as MatIconDictEntry[];
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    dialogRef: MatDialogRef<AssignmentDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: Assignment | null;
      matIconsDict: MatIconDictEntry[];
    }
  ) {
    super(dialogRef, matDialog, data);
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: [0, Validators.required]
    });
  }

  loadForm(selectedRow: Assignment) {
    this.form = this.formBuilder.group({
      name: [selectedRow.name, Validators.required],
      icon: [
        this.matIconsDict.findIndex(
          (matIcon: MatIconDictEntry) => matIcon.name === selectedRow.icon
        ),
        Validators.required
      ]
    });
  }

  buildItem(editMode: boolean, item: Assignment): Assignment {
    return {
      uid: this.editMode ? item.uid : null,
      name: this.name.value,
      icon: this.getIconName()
    };
  }

  performAdd(item: Assignment): Promise<Assignment> {
    return this.dictionaryService.createAssignment(item);
  }

  performEdit(item: Assignment): Promise<Assignment> {
    return this.dictionaryService.editAssignment(item);
  }

  getIconName(): string {
    return this.matIconsDict[this.icon.value as number].name;
  }

  previousAssignmentIcon() {
    let iconIndex: number = this.icon.value as number;

    if (iconIndex === 0) {
      iconIndex = this.matIconsDict.length - 1;
    } else {
      iconIndex -= 1;
    }

    this.setAssignmentIcon(iconIndex);
  }

  nextAssignmentIcon() {
    let iconIndex: number = this.icon.value as number;

    if (iconIndex === this.matIconsDict.length - 1) {
      iconIndex = 0;
    } else {
      iconIndex += 1;
    }

    this.setAssignmentIcon(iconIndex);
  }

  private setAssignmentIcon(iconIndex: number) {
    this.icon.setValue(iconIndex);
    this.icon.markAsDirty();
  }
}
