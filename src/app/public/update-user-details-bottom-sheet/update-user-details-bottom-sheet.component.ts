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
      studentClass: ["", [Validators.required, StudentClass]],
      studentNo: ["", [Validators.required, StudentNo]]
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

      this.authService.updateUserProfileDetails(UserDetails);

      this.bottomSheetRef.dismiss(UserDetails);
    }
  }
}
