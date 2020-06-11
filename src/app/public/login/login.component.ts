import { AfterViewChecked, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router
} from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";
import { RedirectToLoginState } from "src/app/core/actions/redirect-to-login-state.action";
import { SubjectError, SubjectSuccess } from "src/app/core/models";
import { UserDetails } from "src/app/core/models/User/user-details.model";
import { AuthService } from "src/app/core/services/auth.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SpinnerMessage } from "src/app/core/spinner-message.consts";
import { UpdateUserDetailsBottomSheetComponent } from "../update-user-details-bottom-sheet/update-user-details-bottom-sheet.component";
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from "firebaseui-angular";

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
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private spinnerService: SpinnerService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.createForm();

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(routerEvent => routerEvent instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.showSnackBarOnLogout(this.authService.onLogoutState);
      });

    this.route.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((paramMap: ParamMap) => {
        this.returnUrl = paramMap.get("returnUrl");
      });

    this.authService.loggedIn$
      .pipe(untilDestroyed(this))
      .subscribe((resp: SubjectSuccess | SubjectError) => {
        if (resp["error"]) {
          this.spinnerService.hideSpinner();
          this.snackBarService.showLoginError(resp["error"]);
        } else {
          this.spinnerService.hideSpinner();
          if (this.authService.user.auth) {
            if (
              this.authService.user.auth.email &&
              this.authService.user.details
            ) {
              this.redirectAfterLogin();
            } else {
              this.openUpdateUserDetailsDialog();
            }
          } else {
            this.showSnackBarOnLogout(this.authService.onLogoutState);
          }
        }
      });
  }

  ngAfterViewChecked() {
    this.addLoginButtonProviderClickListeners();
    this.swapLoginButtonProviderLabels();
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

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.spinnerService.hideSpinner();
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    this.spinnerService.hideSpinner();
  }

  private showSnackBarOnLogout(state?: { [k: string]: any }) {
    if (state) {
      if (state[RedirectToLoginState.UserRegisterSuccess]) {
        this.snackBarService.showUserRegistered();
      } else if (state[RedirectToLoginState.SentHomeworkSuccess]) {
        this.authService.signOut();
        this.snackBarService.showHomeworkSent(
          state[RedirectToLoginState.SentHomeworkSuccess]
        );
      } else if (state[RedirectToLoginState.SentHomeworkFailed]) {
        this.authService.signOut();
        this.snackBarService.showHomeworkSentFailed(
          state[RedirectToLoginState.SentHomeworkFailed]
        );
      } else if (state[RedirectToLoginState.NoAdminRole]) {
        this.authService.signOut();
        this.snackBarService.showNoAdminRole();
      } else if (state[RedirectToLoginState.NoStudentRole]) {
        this.authService.signOut();
        this.snackBarService.showNoStudentRole();
      } else if (state[RedirectToLoginState.UserDetailsUpdated]) {
        this.authService.signOut();
        this.snackBarService.showUserDetailsUpdated(
          state[RedirectToLoginState.UserDetailsUpdated]
        );
      } else if (state[RedirectToLoginState.StudentNotAllowedForLesson]) {
        this.authService.signOut();
        this.snackBarService.showStudentNotAllowedForLesson(
          state[RedirectToLoginState.StudentNotAllowedForLesson]
        );
      } else if (state[RedirectToLoginState.LessonInactive]) {
        this.authService.signOut();
        this.snackBarService.showLessonInactive(
          state[RedirectToLoginState.LessonInactive]
        );
      }
    }
  }

  private openUpdateUserDetailsDialog() {
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
        this.authService.user.details = result;
        const state = {};
        state[RedirectToLoginState.UserDetailsUpdated] = <UserDetails>result;
        this.authService.redirectToLogin(this.returnUrl, state);
      });
  }

  private redirectAfterLogin() {
    this.submitted = false;
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else if (this.authService.user.roles.admin) {
      this.router.navigate(["admin"]);
    } else if (this.authService.user.roles.student) {
      this.router.navigate(["send-homework"]);
    } else {
      this.authService.signOut();
      this.snackBarService.showNoRulesInfo(this.authService.user);
    }
  }

  private swapLoginButtonProviderLabels() {
    //this.swapLoginButtonProviderLabel("facebook.com", "Facebooka");
    //this.swapLoginButtonProviderLabel("google.com", "Google");
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
      const styleAttr = loginProviderButton.getAttribute("style");
      if (styleAttr.indexOf("min-width") < 0) {
        loginProviderButton.setAttribute(
          "style",
          `${styleAttr}; min-width: 250px`
        );
      }

      loginProviderButton.addEventListener("click", () => {
        this.spinnerService.showSpinner(SpinnerMessage.LoggingInWithProvider, {
          provider
        });
      });
    }
  }
}
