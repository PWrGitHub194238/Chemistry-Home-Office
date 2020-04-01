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
import { UserDetails } from "src/app/core/models/user/user-details.model";
import { AuthService } from "src/app/core/services/auth.service";
import {
  StudentClass,
  StudentNo
} from "src/app/shared/validators/login-form.validator";

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
    private bottomSheetRef: MatBottomSheetRef<
      UpdateUserDetailsBottomSheetComponent
    >,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: any
  ) {}

  ngOnInit() {
    this.createForm();
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
        [Validators.required, StudentClass]
      ],
      studentNo: [
        {
          value: this.studentNoDefaultValue,
          disabled: !!this.studentNoDefaultValue
        },
        [Validators.required, StudentNo]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const UserDetails: UserDetails = {
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
