import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ClassDictEntry } from "src/app/core/models";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@UntilDestroy()
@Component({
  selector: "cho-class-dict-dialog",
  templateUrl: "./class-dict-dialog.component.html",
  styleUrls: ["./class-dict-dialog.component.scss"]
})
export class ClassDictDialogComponent extends BaseTablePanelDialogComponent<
  ClassDictEntry
> {
  get className(): FormControl {
    return this.form.get("className") as FormControl;
  }

  get studentCount(): FormControl {
    return this.form.get("studentCount") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    dialogRef: MatDialogRef<ClassDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: ClassDictEntry | null;
    }
  ) {
    super(dialogRef, matDialog, data);
  }

  afterOnInit() {
    this.className.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) =>
        this.className.setValue(value.toUpperCase(), { emitEvent: false })
      );
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      className: [
        "",
        [Validators.required, Validators.pattern("^[1-9][a-zA-Z]$")]
      ],
      studentCount: ["", Validators.required]
    });
  }

  loadForm(selectedRow: ClassDictEntry) {
    this.form = this.formBuilder.group({
      className: [
        selectedRow.classNo + selectedRow.subclass,
        [Validators.required, Validators.pattern("^[1-9][a-zA-Z]$")]
      ],
      studentCount: [selectedRow.studentCount, Validators.required]
    });
  }

  buildItem(editMode: boolean, item: ClassDictEntry): ClassDictEntry {
    return {
      uid: this.editMode ? item.uid : null,
      classNo: this.className.value[0],
      subclass: this.className.value[1],
      studentCount: this.studentCount.value
    };
  }

  performAdd(item: ClassDictEntry): Promise<ClassDictEntry> {
    return this.dictionaryService.createClass(item);
  }

  performEdit(item: ClassDictEntry): Promise<ClassDictEntry> {
    return this.dictionaryService.editClass(item);
  }
}
