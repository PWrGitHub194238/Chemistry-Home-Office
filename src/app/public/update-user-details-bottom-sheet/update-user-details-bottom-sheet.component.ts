import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material/bottom-sheet";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserDetailsDictEntry } from "src/app/core/models/user/user-details-dict-entry.model";
import { AuthService } from "src/app/core/services/auth.service";
import { DictionaryService } from "src/app/core/services/dictionary.service";
import { LoginFormValidator } from "src/app/shared/validators/login-form.validator";

@UntilDestroy()
@Component({
  selector: "cho-update-user-details-bottom-sheet",
  templateUrl: "./update-user-details-bottom-sheet.component.html",
  styleUrls: ["./update-user-details-bottom-sheet.component.scss"]
})
export class UpdateUserDetailsBottomSheetComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;

  get userMailDefaultValue(): string | null {
    return this.authService.user.auth ? this.authService.user.auth.email : null;
  }

  get studentClassDefaultValue(): string | null {
    return this.authService.user.details
      ? this.authService.user.details.studentClass
      : null;
  }

  get studentNoDefaultValue(): number | null {
    return this.authService.user.details
      ? this.authService.user.details.studentNo
      : null;
  }

  get userMail(): FormControl {
    return this.registerForm.get("userMail") as FormControl;
  }

  get studentClass(): FormControl {
    return this.registerForm.get("studentClass") as FormControl;
  }

  get studentNo(): FormControl {
    return this.registerForm.get("studentNo") as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dictionaryService: DictionaryService,
    private bottomSheetRef: MatBottomSheetRef<
      UpdateUserDetailsBottomSheetComponent
    >,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: any
  ) {}

  ngOnInit() {
    this.createForm();

    this.studentClass.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) =>
        this.studentClass.setValue(value.toUpperCase(), { emitEvent: false })
      );
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      userMail: [
        {
          value: this.userMailDefaultValue,
          disabled: !!this.userMailDefaultValue
        },
        [Validators.required, Validators.email]
      ],
      studentClass: [
        {
          value: this.studentClassDefaultValue,
          disabled: !!this.studentClassDefaultValue
        },
        [Validators.required],
        [
          LoginFormValidator.StudentClass(
            this.dictionaryService,
            () => this.studentNo
          )
        ]
      ],
      studentNo: [
        {
          value: this.studentNoDefaultValue,
          disabled: !!this.studentNoDefaultValue
        },
        [Validators.required],
        [
          LoginFormValidator.StudentNo(
            this.dictionaryService,
            () => this.studentClass.value
          )
        ]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const UserDetails: UserDetailsDictEntry = {
        uid: "",
        studentClass: (this.studentClass.value as string).toUpperCase(),
        studentNo: this.studentNo.value as number
      };

      this.authService.updateUserCredentials(this.userMail.value);
      this.authService.updateUserProfileDetails(UserDetails);

      this.bottomSheetRef.dismiss(UserDetails);
    }
  }
}
