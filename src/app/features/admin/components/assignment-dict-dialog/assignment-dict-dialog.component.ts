import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  AssignmentDictEntry,
  MatIconDictEntry,
  NOT_FOUND_ICON,
  NOT_FOUND_ICON_IDX
} from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";
import { SnackBarService } from "src/app/core/services/snack-bar.service";

@Component({
  selector: "cho-assignment-dict-dialog",
  templateUrl: "./assignment-dict-dialog.component.html",
  styleUrls: ["./assignment-dict-dialog.component.scss"]
})
export class AssignmentDictDialogComponent extends BaseTablePanelDialogComponent<
  AssignmentDictEntry
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
    private snackBarService: SnackBarService,
    dialogRef: MatDialogRef<AssignmentDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: AssignmentDictEntry | null;
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

  loadForm(selectedRow: AssignmentDictEntry) {
    const iconIdx = this.matIconsDict.findIndex(
      (matIcon: MatIconDictEntry) => matIcon.name === selectedRow.icon
    );

    if (iconIdx === NOT_FOUND_ICON_IDX) {
      this.snackBarService.showNoMatIconFound(selectedRow.icon);
    }

    this.form = this.formBuilder.group({
      name: [
        { value: selectedRow.name, disabled: this.viewMode },
        Validators.required
      ],
      icon: [{ value: iconIdx, disabled: this.viewMode }, Validators.required]
    });
  }

  buildItem(editMode: boolean, item: AssignmentDictEntry): AssignmentDictEntry {
    return {
      uid: this.editMode ? item.uid : null,
      name: this.name.value,
      icon: this.getIconName()
    };
  }

  performAdd(item: AssignmentDictEntry): Promise<AssignmentDictEntry> {
    return this.dictionaryService.createAssignment(item);
  }

  performEdit(item: AssignmentDictEntry): Promise<AssignmentDictEntry> {
    return this.dictionaryService.editAssignment(item);
  }

  getIconName(): string {
    const icon: MatIconDictEntry = this.matIconsDict[this.icon.value as number];
    return icon ? icon.name : NOT_FOUND_ICON;
  }

  previousAssignmentIcon() {
    let iconIndex: number = this.icon.value as number;

    if (iconIndex === 0 || iconIndex === NOT_FOUND_ICON_IDX) {
      // -1 - not found
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
