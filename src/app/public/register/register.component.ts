import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "src/app/core/services/auth.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import {
  Name,
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
      userLogin: ["", [Validators.required, Name]],
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
        this.formatUserLogin(this.userLogin.value),
        this.userMail.value,
        this.userPassword.value,
        {
          uid: "",
          studentClass: (this.studentClass.value as string).toUpperCase(),
          studentNo: this.studentNo.value as number
        }
      );
    }
  }

  private formatUserLogin(userLogin: string): string {
    return userLogin
      .split(" ")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
      )
      .join(" ");
  }

  onLoginButtonClick() {
    this.authService.redirectToLogin(this.returnUrl, null);
  }
}
