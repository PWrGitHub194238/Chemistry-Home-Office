import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { Observable } from "rxjs";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";
import { map } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { Select } from "src/app/models/select.model";
import { UpdateUserDetailsBottomSheetComponent } from "../update-user-details-bottom-sheet/update-user-details-bottom-sheet.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { UserDetails } from "functions/src/models/user-details.model";

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
    return this.authService.userDetails
      ? Number(this.authService.userDetails.studentClass[0])
      : null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private fireStoreService: AngularFirestore,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    if (this.authService.userDetails) {
      this.loadLessons();
    } else {
      this.openUpdateUserDetailsDialog();
    }
    this.createForm();
  }

  createForm() {
    this.lessonForm = this.formBuilder.group({
      lesson: ["", Validators.required]
    });
  }

  loadLessons() {
    this.fireStoreService
      .collection<HomeworkPath>("homework-paths", ref =>
        ref
          .where("active", "==", true)
          .where("class", "==", this.studenClassPrefix)
          .orderBy("date")
      )
      .valueChanges()
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

  openUpdateUserDetailsDialog() {
    let bottomSheetRef = this.bottomSheet.open(
      UpdateUserDetailsBottomSheetComponent,
      {
        disableClose: true
      }
    );

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe((result: UserDetails) => {
        this.authService.userDetails = result;
        this.loadLessons();
      });
  }
}
