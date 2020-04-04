import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { SentHomeworkFile } from "src/app/models";

@Component({
  selector: "cho-add-comment-for-upload-dialog",
  templateUrl: "./add-comment-for-upload-dialog.component.html",
  styleUrls: ["./add-comment-for-upload-dialog.component.scss"]
})
export class AddCommentForUploadDialogComponent implements OnInit {
  aditionalUploadInfoForm: FormGroup;
  submitted: boolean;

  get assignmentControl(): FormControl {
    return this.aditionalUploadInfoForm.get("assignmentControl") as FormControl;
  }

  get uploadFileName(): FormControl {
    return this.aditionalUploadInfoForm.get("uploadFileName") as FormControl;
  }

  get uploadFileNameDefaultValue(): string {
    return this.data.homeworkFileMetadata.fileName;
  }

  get uploadFileDescription(): FormControl {
    return this.aditionalUploadInfoForm.get(
      "uploadFileDescription"
    ) as FormControl;
  }

  get homeworkPath() {
    return this.data.homeworkPath;
  }

  get assignments() {
    return this.homeworkPath.assignments.map(assignment => assignment.name);
  }

  get formValue(): SentHomeworkFile {
    return {
      fileName: this.uploadFileName.value,
      fullPath: this.data.homeworkFileMetadata.fullPath,
      assignment: this.assignmentControl.value,
      description: this.uploadFileDescription.value
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCommentForUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      homeworkPath: HomeworkPath;
      homeworkFileMetadata: SentHomeworkFile;
    }
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.aditionalUploadInfoForm = this.formBuilder.group({
      assignmentControl: [
        this.data.homeworkFileMetadata.assignment,
        Validators.required
      ],
      uploadFileName: [
        this.data.homeworkFileMetadata.fileName,
        Validators.required
      ],
      uploadFileDescription: this.data.homeworkFileMetadata.description
    });
  }

  onReset() {
    this.aditionalUploadInfoForm.setValue({
      assignmentControl: this.data.homeworkFileMetadata.assignment,
      uploadFileName: this.data.homeworkFileMetadata.fileName,
      uploadFileDescription: this.data.homeworkFileMetadata.description
    });
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.submitted = true;
    if (this.aditionalUploadInfoForm.valid) {
      this.dialogRef.close(this.formValue);
    }
  }
}
