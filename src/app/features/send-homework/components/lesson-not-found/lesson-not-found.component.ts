import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/core/services/auth.service";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Select } from "src/app/models/select.model";

@UntilDestroy()
@Component({
  selector: "cho-lesson-not-found",
  templateUrl: "./lesson-not-found.component.html",
  styleUrls: ["./lesson-not-found.component.scss"]
})
export class LessonNotFoundComponent {
  lessonForm: FormGroup;
  returnUrl: string;
  lessons: Select[];

  get lessonControl(): FormControl {
    return this.lessonForm.get("lesson") as FormControl;
  }

  get studenClassPrefix(): number | null {
    return this.authService.user.details
      ? Number(this.authService.user.details.studentClass[0])
      : null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private firestoreDocumentService: FirestoreDocumentService
  ) {}

  ngOnInit() {
    this.loadLessons();
    this.createForm();
  }

  createForm() {
    this.lessonForm = this.formBuilder.group({
      lesson: ["", Validators.required]
    });
  }

  loadLessons() {
    this.firestoreDocumentService
      .getActiveHomeworkPathsForClass$(this.studenClassPrefix)
      .pipe(
        untilDestroyed(this),
        map(homeworkPaths =>
          homeworkPaths.map(homeworkPath => ({
            key: homeworkPath.uid,
            value: homeworkPath.topic
          }))
        )
      )
      .subscribe(lessonTopics => (this.lessons = lessonTopics));
  }

  onSelectionChange(selectionChange: MatSelectChange) {
    if (this.lessonForm.valid) {
      this.router.navigate(["send-homework", selectionChange.value]);
    }
  }
}
