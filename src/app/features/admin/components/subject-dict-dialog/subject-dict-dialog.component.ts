import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { SubjectDictEntry } from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-subject-dict-dialog",
  templateUrl: "./subject-dict-dialog.component.html",
  styleUrls: ["./subject-dict-dialog.component.scss"]
})
export class SubjectDictDialogComponent extends BaseTablePanelDialogComponent<
  SubjectDictEntry
> {
  get name(): FormControl {
    return this.form.get("name") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    dialogRef: MatDialogRef<SubjectDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: SubjectDictEntry | null;
    }
  ) {
    super(dialogRef, matDialog, data);
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  loadForm(selectedRow: SubjectDictEntry) {
    this.form = this.formBuilder.group({
      name: [
        { value: selectedRow.name, disabled: this.viewMode },
        [Validators.required]
      ]
    });
  }

  buildItem(editMode: boolean, item: SubjectDictEntry): SubjectDictEntry {
    return {
      uid: this.editMode ? item.uid : null,
      name: this.name.value
    };
  }

  performAdd(item: SubjectDictEntry): Promise<SubjectDictEntry> {
    return this.dictionaryService.createSubject(item);
  }

  performEdit(item: SubjectDictEntry): Promise<SubjectDictEntry> {
    return this.dictionaryService.editSubject(item);
  }
}
