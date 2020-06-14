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
import { FirefunctionService } from "src/app/core/services/firefunction.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";

@UntilDestroy()
@Component({
  selector: "cho-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted: boolean;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firefunctionService: FirefunctionService,
    private snackBarService: SnackBarService,
    private spinnerService: SpinnerService
  ) {}

  get userMail(): FormControl {
    return this.resetPasswordForm.get("userMail") as FormControl;
  }

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((paramMap: ParamMap) => {
        this.returnUrl = paramMap.get("returnUrl");
      });

    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.formBuilder.group({
      userMail: ["", [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.spinnerService.showSpinner(SpinnerMessage.ResetPassword);

      this.firefunctionService
        .resetUserPassword$(undefined, this.userMail.value)
        .pipe(untilDestroyed(this))
        .subscribe(
          (result: boolean) => {
            const quardPayload = {};
            if (result) {
              this.spinnerService.hideSpinner();
              this.snackBarService.showSentPasswordResetRequestSuccess(
                this.userMail.value
              );
              this.authService.redirectToLogin(this.returnUrl);
            } else {
              this.spinnerService.hideSpinner();
              this.snackBarService.showSentPasswordResetRequestFailed(
                "podany adres e-mail nie istnieje"
              );
            }
          },
          (error: any) => {
            this.spinnerService.hideSpinner();
            this.snackBarService.showSentPasswordResetRequestFailed(error);
          }
        );
    }
  }

  onLoginButtonClick() {
    this.authService.redirectToLogin(this.returnUrl, null);
  }
}
