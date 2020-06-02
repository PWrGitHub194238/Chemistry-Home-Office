import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";
import { Class, Student } from "src/app/models";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";
import { LoginFormValidator } from "src/app/shared/validators/login-form.validator";
import { DictionaryService } from "src/app/core/services/dictionary.service";

@Component({
  selector: "cho-user-details-dialog",
  templateUrl: "./user-details-dialog.component.html",
  styleUrls: ["./user-details-dialog.component.scss"]
})
export class UserDetailsDialogComponent extends BaseTablePanelDialogComponent<
  Student
> {
  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  get displayName(): FormControl {
    return this.form.get("displayName") as FormControl;
  }

  get photoURL(): FormControl {
    return this.form.get("photoURL") as FormControl;
  }

  get disabled(): FormControl {
    return this.form.get("disabled") as FormControl;
  }

  get providerId(): FormControl {
    return this.form.get("providerId") as FormControl;
  }

  get class(): FormControl {
    return this.form.get("class") as FormControl;
  }

  get no(): FormControl {
    return this.form.get("no") as FormControl;
  }

  get admin(): FormControl {
    return this.form.get("admin") as FormControl;
  }

  get student(): FormControl {
    return this.form.get("student") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    private firestoreDocumentService: FirestoreDocumentService,
    dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: Student | null;
    }
  ) {
    super(dialogRef, matDialog, data);
  }

  afterOnInit() {
    this.class.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) =>
        this.class.setValue(value.toUpperCase(), { emitEvent: false })
      );
  }

  createNewForm() {
    this.form = this.formBuilder.group({});
  }

  loadForm(selectedRow: Student) {
    this.form = this.formBuilder.group({
      email: [
        { value: selectedRow.email, disabled: true },
        [Validators.required, Validators.email]
      ],
      displayName: [
        { value: selectedRow.displayName, disabled: true },
        [Validators.required, LoginFormValidator.Name()]
      ],
      photoURL: [
        { value: selectedRow.photoURL, disabled: true },
        Validators.required
      ],
      disabled: [selectedRow.disabled, Validators.required],
      providerId: [
        { value: selectedRow.providerId, disabled: true },
        Validators.required
      ],
      class: [
        selectedRow.class,
        [Validators.required],
        [LoginFormValidator.StudentClass(this.dictionaryService, () => this.no)]
      ],
      no: [
        selectedRow.no,
        [Validators.required],
        [
          LoginFormValidator.StudentNo(
            this.dictionaryService,
            () => this.class.value
          )
        ]
      ],
      admin: [selectedRow.admin, Validators.required],
      student: [selectedRow.student, Validators.required]
    });
  }

  buildItem(editMode: boolean, item: Student): Student {
    return {
      uid: this.editMode ? item.uid : null,
      email: item.email,
      displayName: item.displayName,
      photoURL: item.photoURL,
      disabled: item.disabled,
      providerId: item.providerId,
      class: item.class,
      no: item.no,
      admin: item.admin,
      student: item.student
    };
  }

  // performEdit(item: Student): Promise<Student> {
  //   return this.firestoreDocumentService.editClass(item);
  // }
}
