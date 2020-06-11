import { Component, Inject } from "@angular/core";
import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { HomeworkPath, SentHomework, SentHomeworkFile } from "src/app/models";
import { FileRowForm } from "../../models/file-row-form.mode";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";

@Component({
  selector: "cho-sent-homeworks-inner-table-dialog",
  templateUrl: "./sent-homeworks-inner-table-dialog.component.html",
  styleUrls: ["./sent-homeworks-inner-table-dialog.component.scss"]
})
export class SentHomeworksInnerTableDialogComponent extends BaseTablePanelDialogComponent<
  SentHomework
> {
  get displayName(): FormControl {
    return this.form.get("displayName") as FormControl;
  }

  get studentClass(): FormControl {
    return this.form.get("studentClass") as FormControl;
  }

  get studentNo(): FormControl {
    return this.form.get("studentNo") as FormControl;
  }

  get date(): FormControl {
    return this.form.get("date") as FormControl;
  }

  get files(): FormArray {
    return this.form.get("files") as FormArray;
  }

  get homeworkPath(): HomeworkPath {
    return this.data["homeworkPath"] as HomeworkPath;
  }

  get fileRows(): FileRowForm[] {
    return this.data["fileRows"] as FileRowForm[];
  }

  set fileRows(fileRows: FileRowForm[]) {
    this.data["fileRows"] = fileRows;
  }

  private filesCopy: SentHomeworkFile[];

  constructor(
    private formBuilder: FormBuilder,
    private firestoreDocumentService: FirestoreDocumentService,
    dialogRef: MatDialogRef<SentHomeworksInnerTableDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: SentHomework | null;
      homeworkPath: HomeworkPath;
      fileRows: FileRowForm[];
    }
  ) {
    super(dialogRef, matDialog, data);
    this.filesCopy = [
      ...data.fileRows.map((fileRow: FileRowForm) => ({
        ...fileRow
      }))
    ];
  }

  createNewForm() {}

  loadForm(selectedRow: SentHomework) {
    this.form = this.formBuilder.group({
      displayName: { value: selectedRow.displayName, disabled: true },
      studentClass: {
        value: selectedRow.userDetails.studentClass,
        disabled: true
      },
      studentNo: { value: selectedRow.userDetails.studentNo, disabled: true },
      date: {
        value: new Date(
          Number(this.selectedRow.date["seconds"]) * 1000
        ).toLocaleString(),
        disabled: true
      },
      files: this.formBuilder.array([])
    });

    selectedRow.files.forEach((file: SentHomeworkFile, index: number) => {
      this.fileRows[index].statusFormIdx = index;
      this.files.push(
        this.formBuilder.control({
          value: file.status,
          disabled: false
        })
      );
    });
  }

  onReset() {
    this.fileRows = [
      ...this.filesCopy.map((fileRow: FileRowForm) => ({
        ...fileRow
      }))
    ];

    super.onReset();
  }

  protected buildItem(editMode: boolean, item: SentHomework): SentHomework {
    return {
      uid: this.editMode ? item.uid : null,
      email: item.email,
      displayName: item.displayName,
      userDetails: { ...item.userDetails },
      files: [
        ...item.files.map((file: SentHomeworkFile, index: number) => ({
          ...file,
          status: (this.files.controls[index] as FormControl).value
        }))
      ],
      date: item.date,
      homeworkPath: { ...item.homeworkPath }
    };
  }

  protected async performEdit(item: SentHomework): Promise<SentHomework> {
    return this.firestoreDocumentService.editSentHomework$(item);
  }

  onFileStateChange(fileRow: FileRowForm) {
    const fileControl = this.files.controls[
      fileRow.statusFormIdx
    ] as FormControl;
    fileControl.setValue(fileRow.status);
    fileControl.markAsDirty();
  }
}
