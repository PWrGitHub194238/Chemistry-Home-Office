import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Observable } from "rxjs";
import { UserDisplayDict } from "src/app/core/models";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { LoginFormValidator } from "src/app/shared/validators/login-form.validator";
import { BaseTablePanelDialogComponent } from "../base-table-panel-dialog/base-table-panel-dialog.component";

@Component({
  selector: "cho-user-details-dialog",
  templateUrl: "./user-details-dialog.component.html",
  styleUrls: ["./user-details-dialog.component.scss"]
})
export class UserDetailsDialogComponent extends BaseTablePanelDialogComponent<
  UserDisplayDict
> {
  studentClasses$: Observable<string[]>;

  get enabled(): FormControl {
    return this.form.get("enabled") as FormControl;
  }

  get displayName(): FormControl {
    return this.form.get("displayName") as FormControl;
  }

  get studentClass(): FormControl {
    return this.form.get("studentClass") as FormControl;
  }

  get studentNo(): FormControl {
    return this.form.get("studentNo") as FormControl;
  }

  get admin(): FormControl {
    return this.form.get("admin") as FormControl;
  }

  get student(): FormControl {
    return this.form.get("student") as FormControl;
  }

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
    private authService: AuthService,
    dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    matDialog: MatDialog,
    spinnerService: SpinnerService,
    changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    data: {
      selectedRow: UserDisplayDict | null;
    }
  ) {
    super(dialogRef, matDialog, spinnerService, changeDetector, data);
    this.studentClasses$ = this.dictionaryService.getAllClassesByString$();
  }

  createNewForm() {}

  loadForm(selectedRow: UserDisplayDict) {
    this.form = this.formBuilder.group({
      enabled: [
        { value: !selectedRow.disabled, disabled: this.viewMode },
        [Validators.required]
      ],
      displayName: [
        { value: selectedRow.displayName, disabled: this.viewMode },
        [Validators.required, LoginFormValidator.Name()]
      ],
      studentClass: [
        { value: selectedRow.details.studentClass, disabled: this.viewMode },
        [Validators.required]
      ],
      studentNo: [
        { value: selectedRow.details.studentNo, disabled: this.viewMode },
        [Validators.required],
        [
          LoginFormValidator.StudentNo(this.dictionaryService, () =>
            this.form ? this.studentClass.value : ""
          )
        ]
      ],
      admin: [
        { value: selectedRow.roles.admin, disabled: this.viewMode },
        Validators.required
      ],
      student: [
        { value: selectedRow.roles.student, disabled: this.viewMode },
        Validators.required
      ]
    });
  }

  buildItem(editMode: boolean, item: UserDisplayDict): UserDisplayDict {
    return {
      uid: this.editMode ? item.uid : null,
      disabled: !this.enabled.value,
      emailVerified: item.emailVerified,
      displayName: this.displayName.value,
      photoURL: item.photoURL,
      details: {
        uid: this.editMode ? item.details.uid : null,
        studentClass: this.studentClass.value,
        studentNo: this.studentNo.value
      },
      roles: {
        uid: this.editMode ? item.roles.uid : null,
        admin: this.admin.value,
        student: this.student.value
      }
    };
  }

  protected async performEdit(item: UserDisplayDict): Promise<UserDisplayDict> {
    return this.authService.editUserDisplay$(item).toPromise();
  }

  enabledToggle(toggleChange: MatSlideToggleChange) {
    this.enabled.setValue(toggleChange.checked);
  }

  adminRoleToggle(toggleChange: MatSlideToggleChange) {
    this.admin.setValue(toggleChange.checked);
  }

  studentRoleToggle(toggleChange: MatSlideToggleChange) {
    this.student.setValue(toggleChange.checked);
  }
}
