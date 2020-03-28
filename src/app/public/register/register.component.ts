import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";
import { SnackBarService } from "src/app/core/snack-bar.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { SpinnerService } from "src/app/core/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import {
  NoEmail,
  StudentClass,
  StudentNo
} from "src/app/shared/validators/login-form.validator";

@UntilDestroy()
@Component({
  selector: "cho-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private spinnerService: SpinnerService
  ) {}

  get userLogin(): FormControl {
    return this.registerForm.get("userLogin") as FormControl;
  }

  get userMail(): FormControl {
    return this.registerForm.get("userMail") as FormControl;
  }

  get userPassword(): FormControl {
    return this.registerForm.get("userPassword") as FormControl;
  }

  get studentClass(): FormControl {
    return this.registerForm.get("studentClass") as FormControl;
  }

  get studentNo(): FormControl {
    return this.registerForm.get("studentNo") as FormControl;
  }

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  ngOnInit() {
    this.createForm();

    this.route.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((paramMap: ParamMap) => {
        this.returnUrl = paramMap.get("returnUrl");
      });

    this.authService.signedIn$.pipe(untilDestroyed(this)).subscribe(resp => {
      if (resp["error"]) {
        this.spinnerService.hideSpinner();
        this.snackBarService.showRegistrationError(resp["error"]);
      } else {
        this.submitted = false;
        this.spinnerService.hideSpinner();
        this.authService.redirectToLogin(this.returnUrl, null);
      }
    });
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      userLogin: ["", [Validators.required, NoEmail]],
      userMail: ["", [Validators.required, Validators.email]],
      userPassword: ["", Validators.required],
      studentClass: ["", [Validators.required, StudentClass]],
      studentNo: ["", [Validators.required, StudentNo]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.spinnerService.showSpinner(SpinnerMessage.RegisteringUser);
      this.authService.signInWithEmailAndPassword(
        this.userLogin.value,
        this.userMail.value,
        this.userPassword.value,
        {
          studentClass: (this.studentClass.value as string).toUpperCase(),
          studentNo: this.studentNo.value as number
        }
      );
    }
  }

  onLoginButtonClick() {
    this.authService.redirectToLogin(this.returnUrl, null);
  }
}
