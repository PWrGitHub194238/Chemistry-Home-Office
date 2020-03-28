import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { tap } from "rxjs/operators";
import { LogoutStateAction } from "src/app/core/actions/logout-state.action";
import { AuthService } from "src/app/core/auth.service";
import { SnackBarService } from "src/app/core/snack-bar.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import { SpinnerService } from "src/app/core/spinner.service";

@UntilDestroy()
@Component({
  selector: "cho-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewChecked {
  loginForm: FormGroup;
  submitted: boolean;
  returnUrl: string;

  get userMail(): FormControl {
    return this.loginForm.get("userMail") as FormControl;
  }

  get userPassword(): FormControl {
    return this.loginForm.get("userPassword") as FormControl;
  }

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firebaseAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.createForm();

    this.route.queryParamMap
      .pipe(
        untilDestroyed(this),
        tap(() => this.showSnackBarOnLogout(window.history.state))
      )
      .subscribe((paramMap: ParamMap) => {
        this.returnUrl = paramMap.get("returnUrl");
      });

    this.firebaseAuth.authState.pipe(untilDestroyed(this)).subscribe(user => {
      this.spinnerService.hideSpinner();
      this.authService.user = user;
      if (user) {
        this.submitted = false;
        this.router.navigateByUrl(this.returnUrl);
      }
    });

    this.authService.loggedIn$.pipe(untilDestroyed(this)).subscribe(resp => {
      if (resp["error"]) {
        this.spinnerService.hideSpinner();
        this.snackBarService.showLoginError(resp["error"]);
      }
    });
  }

  ngAfterViewChecked(): void {
    //this.swapLoginButtonProviderLabels();
    this.addLoginButtonProviderClickListeners();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userMail: ["", [Validators.required, Validators.email]],
      userPassword: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinnerService.showSpinner(SpinnerMessage.LoggingIn);
      this.authService.logInWithEmailAndPassword(
        this.userMail.value,
        this.userPassword.value
      );
    }
  }

  onRegisterButtonClick() {
    this.authService.redirectToRegister(this.returnUrl);
  }

  private showSnackBarOnLogout(state?: { [k: string]: any }) {
    if (state && state[LogoutStateAction.SentHomeworkSuccess]) {
      this.snackBarService.showHomeworkSent(
        state[LogoutStateAction.SentHomeworkSuccess]
      );
    }
  }

  private swapLoginButtonProviderLabels() {
    this.swapLoginButtonProviderLabel("facebook.com", "Facebooka");
    this.swapLoginButtonProviderLabel("google.com", "Google");
  }

  private swapLoginButtonProviderLabel(providerId: string, label: string) {
    const loginProviderButtonLabel: Element = document.querySelector(
      `.firebaseui-idp-button[data-provider-id="${providerId}"] > .firebaseui-idp-text-long`
    );
    if (loginProviderButtonLabel) {
      loginProviderButtonLabel.innerHTML = `Zaloguj się przez ${label}`;
    }
  }

  private addLoginButtonProviderClickListeners() {
    this.addLoginButtonProviderClickListener("facebook.com", "Facebooka");
    this.addLoginButtonProviderClickListener("google.com", "Google");
  }

  private addLoginButtonProviderClickListener(
    providerId: string,
    provider: string
  ) {
    const loginProviderButton: Element = document.querySelector(
      `.firebaseui-idp-button[data-provider-id="${providerId}"`
    );
    if (loginProviderButton) {
      // loginProviderButton.setAttribute(
      //   "style",
      //   `${loginProviderButton.getAttribute("style")}; min-width: 250px`
      // );
      loginProviderButton.addEventListener("click", () => {
        this.spinnerService.showSpinner(SpinnerMessage.LoggingInWithProvider, {
          provider
        });
      });
    }
  }
}
