import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
  zip
} from "rxjs";
import { map, switchMap, take, takeUntil, tap } from "rxjs/operators";
import {
  SubjectError,
  SubjectSuccess,
  User,
  UserDetailsDictEntry,
  UserDisplayDict,
  UserRecord,
  UserRolesDictEntry
} from "../models";
import { FirestoreDocumentService } from "../services/firestore-document.service";
import { DictionaryService } from "./dictionary.service";
import { FirefunctionService } from "./firefunction.service";
import { SnackBarService } from "./snack-bar.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class AuthService {
  signedIn$: Observable<SubjectSuccess | SubjectError>;
  loggedIn$: Observable<SubjectSuccess | SubjectError>;
  user$: Observable<User | null>;
  user: User | null;
  onLogoutState: { [key: string]: any };
  registering: boolean;

  private timeout = 1000 * 60 * 10;

  private signedInSubject$: Subject<SubjectSuccess | SubjectError>;
  private loggedInSubject$: Subject<SubjectSuccess | SubjectError>;
  private userSubject$: BehaviorSubject<User | null>;

  // /user-displays-dict
  private userDisplays: UserDisplayDict[] = [];
  private userDisplays$: Observable<UserDisplayDict[] | null>;
  private userDisplaySubscription: Subscription;

  get isAuthenticated(): boolean {
    return !!this.user && !!this.user.roles;
  }

  get isVerified(): boolean {
    return this.isAuthenticated && this.user.auth.emailVerified;
  }

  get isAdmin(): boolean {
    return this.isAuthenticated && !!this.user.roles.admin;
  }

  get isStudent(): boolean {
    return this.isAuthenticated && !!this.user.roles.student;
  }

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firestoreDocumentService: FirestoreDocumentService,
    private dictionaryService: DictionaryService,
    private firefunctionService: FirefunctionService,
    private snackBarService: SnackBarService,
    private ngZone: NgZone
  ) {
    this.signedInSubject$ = new Subject<SubjectSuccess | SubjectError>();
    this.loggedInSubject$ = new Subject<SubjectSuccess | SubjectError>();
    this.userSubject$ = new BehaviorSubject<User | null>(null);

    this.signedIn$ = this.signedInSubject$.asObservable();
    this.loggedIn$ = this.loggedInSubject$.asObservable();
    this.user$ = this.userSubject$.asObservable();

    // /user-displays-dict
    this.userDisplays$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.userDisplays = null)),
      map(_ => this.userDisplays)
    );

    this.firebaseAuth.authState
      .pipe(
        untilDestroyed(this),
        switchMap((auth: firebase.User) =>
          auth
            ? zip(
                of(auth),
                this.firestoreDocumentService.getUserDetails$(auth.uid),
                this.firestoreDocumentService.getUserRolesOrCreateDefault$(
                  auth.uid
                )
              )
            : of([null, null, null])
        ),
        map(
          ([auth, userDetails, userRoles]: [
            firebase.User,
            UserDetailsDictEntry,
            UserRolesDictEntry
          ]) => ({
            auth: auth,
            details: userDetails,
            roles: userRoles
          })
        )
      )
      .subscribe((user: User) => {
        this.user = user;
        this.userSubject$.next(user);
        this.loggedInSubject$.next({});
      });
  }

  logInWithEmailAndPassword(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(reason => {
        this.loggedInSubject$.next({ error: reason });
      });
  }

  signInWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
    additionalDetails: UserDetailsDictEntry
  ) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials: firebase.auth.UserCredential) => {
        this.setUserProfile(credentials, displayName, additionalDetails);
      })
      .catch(reason => {
        this.signedInSubject$.next({ error: reason });
      });
  }

  updateUserCredentials(email: string) {
    this.user.auth.updateEmail(email);
  }

  setUserProfile(
    credentials: firebase.auth.UserCredential,
    displayName: string,
    additionalDetails: UserDetailsDictEntry
  ) {
    credentials.user
      .updateProfile({
        displayName
      })
      .then(() => {
        this.setUserProfileDetails(credentials, additionalDetails);
      })
      .catch(reason => {
        this.signedInSubject$.next({ error: reason });
      });
  }

  setUserProfileDetails(
    credentials: firebase.auth.UserCredential,
    additionalDetails: UserDetailsDictEntry
  ) {
    this.firestoreDocumentService
      .setUserDetails$(credentials.user.uid, additionalDetails)
      .then(() =>
        this.firestoreDocumentService
          .setUserRoles$(credentials.user.uid, {
            uid: credentials.user.uid,
            admin: false,
            student: true
          })
          .then(() => this.signedInSubject$.next({message: credentials.user.uid}))
      );
  }

  updateUserProfileDetails(
    additionalDetails?: UserDetailsDictEntry
  ): Promise<void> {
    return this.firestoreDocumentService.setUserDetails$(
      this.user.auth.uid,
      additionalDetails
    );
  }

  signOut(): Promise<void> {
    return this.firebaseAuth.auth.signOut();
  }

  logout(returnUrl?: string, redirectPayload?: { [key: string]: any }) {
    this.signOut().then(() =>
      this.ngZone.run(() => this.redirectToLogin(returnUrl, redirectPayload))
    );
  }

  redirectToLogin(
    returnUrl?: string,
    redirectPayload?: { [key: string]: any }
  ) {
    this.onLogoutState = redirectPayload;
    if (returnUrl) {
      this.router.navigate(["home", "login"], {
        queryParams: { returnUrl: returnUrl }
      });
    } else {
      this.router.navigate(["home", "login"]);
    }
  }

  redirectToRegister(
    returnUrl?: string,
    redirectPayload?: { [key: string]: any }
  ) {
    this.onLogoutState = redirectPayload;
    if (returnUrl) {
      this.router.navigate(["home", "register"], {
        queryParams: { returnUrl: returnUrl }
      });
    } else {
      this.router.navigate(["home", "register"]);
    }
  }

  redirectToPasswordRecovery(returnUrl: string) {
    this.router.navigate(["home", "resetPassword"], {
      queryParams: { returnUrl: returnUrl }
    });
  }

  // /user-display-dict
  getAllUserDisplays$(sync?: boolean): Observable<UserDisplayDict[]> {
    if (!this.isAdmin) {
      return of([]);
    }

    return !!sync || this.userDisplays.length === 0
      ? this.firefunctionService.getUserAdminDetails$(this.user.auth.uid).pipe(
          takeUntil(this.userDisplays$),
          untilDestroyed(this),
          tap((userDisplays: UserDisplayDict[]) => {
            this.userDisplays = userDisplays;
            if (this.userDisplaySubscription) {
              this.userDisplaySubscription.unsubscribe();
            }
            this.userDisplaySubscription = this.userDisplays$.subscribe();
          })
        )
      : of(this.userDisplays);
  }

  editUserDisplay$(
    user: UserDisplayDict,
    showNotification: boolean = true
  ): Observable<UserDisplayDict> {
    return zip(
      this.updateUser$(user),
      this.dictionaryService.editUserDetails(user.details, false),
      this.dictionaryService.editUserRoles(user.roles, false)
    ).pipe(
      map(
        ([userRecord, userDetails, userRoles]: [
          UserRecord,
          UserDetailsDictEntry,
          UserRolesDictEntry
        ]) => ({
          uid: userRecord.uid,
          disabled: userRecord.disabled,
          emailVerified: userRecord.emailVerified,
          photoURL: userRecord.photoURL,
          displayName: userRecord.displayName,
          details: userDetails,
          roles: userRoles
        })
      ),
      tap((user: UserDisplayDict) => {
        this.userDisplays.splice(
          this.userDisplays.findIndex(
            (_: UserDisplayDict) => _.uid === user.uid
          ),
          1,
          user
        );
        if (this.userDisplaySubscription) {
          this.userDisplaySubscription.unsubscribe();
        }
        this.userDisplaySubscription = this.userDisplays$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditUserSuccess(user);
        }
        return user;
      })
    );
  }

  deleteUserDisplay$(user: UserDisplayDict, showNotification: boolean = true) {
    return zip(
      this.deleteUser$(user),
      this.dictionaryService.deleteUserDetails(user.details, false),
      this.dictionaryService.deleteUserRoles(user.roles, false)
    )
      .pipe(take(1), untilDestroyed(this))
      .subscribe(() => {
        this.userDisplays.splice(
          this.userDisplays.findIndex(
            (_: UserDisplayDict) => _.uid === user.uid
          ),
          1
        );
        if (this.userDisplaySubscription) {
          this.userDisplaySubscription.unsubscribe();
        }
        this.userDisplaySubscription = this.userDisplays$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteUserSuccess(user);
        }
        return user;
      });
  }

  sentValidateEmailToUser(userUid: string, userDisplayName: string) {
    this.firefunctionService
      .verifyUserEmail$(userUid)
      .pipe(take(1), untilDestroyed(this))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.snackBarService.showSentEmailVerificationRequestSuccess(
              userDisplayName
            );
          }
        },
        (error: any) =>
          this.snackBarService.showSentEmailVerificationRequestFailed(error)
      );
  }

  sentResetPasswordToUser(userUid: string, userDisplayName: string) {
    this.firefunctionService
      .resetUserPassword$(userUid)
      .pipe(take(1), untilDestroyed(this))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.snackBarService.showSentPasswordResetRequestSuccess(
              userDisplayName
            );
          }
        },
        (error: Error) =>
          this.snackBarService.showSentPasswordResetRequestFailed(error.message)
      );
  }

  private updateUser$(updatedUser: UserDisplayDict): Observable<UserRecord> {
    return this.firefunctionService.updateUserData$(
      this.user.auth.uid,
      updatedUser.uid,
      updatedUser.disabled,
      updatedUser.displayName
    );
  }

  private deleteUser$(deletedUser: UserDisplayDict): Observable<boolean> {
    return this.firefunctionService.removeUserData$(
      this.user.auth.uid,
      deletedUser.uid
    );
  }
}
