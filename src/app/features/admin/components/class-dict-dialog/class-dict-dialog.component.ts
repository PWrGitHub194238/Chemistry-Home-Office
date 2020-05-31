import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Class } from "src/app/models";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@UntilDestroy()
@Component({
  selector: "cho-class-dict-dialog",
  templateUrl: "./class-dict-dialog.component.html",
  styleUrls: ["./class-dict-dialog.component.scss"]
})
export class ClassDictDialogComponent extends BaseTablePanelDialogComponent<
  Class
> {
  get className(): FormControl {
    return this.form.get("className") as FormControl;
  }

  get studentCount(): FormControl {
    return this.form.get("studentCount") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private firestoreDocumentService: FirestoreDocumentService,
    dialogRef: MatDialogRef<ClassDictDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: Class | null;
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

  loadForm(selectedRow: Class) {
    this.form = this.formBuilder.group({
      className: [
        selectedRow.classNo + selectedRow.subclass,
        [Validators.required, Validators.pattern("^[1-9][a-zA-Z]$")]
      ],
      studentCount: [selectedRow.studentCount, Validators.required]
    });
  }

  buildItem(editMode: boolean, item: Class): Class {
    return {
      uid: this.editMode ? item.uid : null,
      classNo: this.className.value[0],
      subclass: this.className.value[1],
      studentCount: this.studentCount.value
    };
  }

  performAdd(item: Class): Promise<Class> {
    return this.firestoreDocumentService.createClass(item);
  }

  performEdit(item: Class): Promise<Class> {
    return this.firestoreDocumentService.editClass(item);
  }
}
