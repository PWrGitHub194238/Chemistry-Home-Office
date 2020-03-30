import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import { HomeworkPath } from "src/app/models";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: "cho-homework-path-dialog",
  templateUrl: "./homework-path-dialog.component.html",
  styleUrls: ["./homework-path-dialog.component.scss"]
})
export class HomeworkPathDialogComponent implements OnInit {
  homeworkPathForm: FormGroup;
  submitted: boolean;

  matIconArray = [
    {
      key: "extension",
      value: "Ikona 1"
    },
    {
      key: "stars",
      value: "Ikona 2"
    },
    {
      key: "speaker_notes",
      value: "Ikona 3"
    }
  ];
  subjectArray = ["Chemia"];
  classArray = [7, 8];

  get active(): FormControl {
    return this.homeworkPathForm.get("active") as FormControl;
  }

  get subject(): FormControl {
    return this.homeworkPathForm.get("subject") as FormControl;
  }

  get class(): FormControl {
    return this.homeworkPathForm.get("class") as FormControl;
  }

  get topic(): FormControl {
    return this.homeworkPathForm.get("topic") as FormControl;
  }

  get assignments(): FormArray {
    return this.homeworkPathForm.get("assignments") as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private firestoreDocumentServise: FirestoreDocumentService,
    private dialogRef: MatDialogRef<HomeworkPathDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HomeworkPath | null
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.homeworkPathForm = this.formBuilder.group({
      active: true,
      subject: ["", Validators.required],
      class: ["", Validators.required],
      topic: ["", Validators.required],
      assignments: this.formBuilder.array([])
    });

    this.addAssignment();
  }

  activeToggle(toggleChange: MatSlideToggleChange) {
    this.active.setValue(toggleChange.checked);
  }

  addAssignment() {
    this.assignments.push(
      this.formBuilder.group({
        name: ["", Validators.required],
        icon: ["", Validators.required]
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.homeworkPathForm.valid) {
      this.spinnerService.showSpinner(SpinnerMessage.LoggingIn);
      this.firestoreDocumentServise.createHomeworkPath({
        uid: "",
        active: this.active.value,
        date: null,
        subject: this.subject.value,
        class: this.class.value,
        topic: this.topic.value,
        assignments: this.assignments.value.map((assignment: FormControl) => ({
          name: assignment.get("name").value,
          icon: assignment.get("icon").value
        }))
      });
    }
  }
}
