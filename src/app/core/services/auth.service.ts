import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable, of, Subject, zip } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { SubjectError, SubjectSuccess, User, UserDetails } from "../models";
import { FirestoreDocumentService } from "../services/firestore-document.service";
import { UserRoles } from "functions/src/models/user/user-roles.model";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private signedInSubject$: Subject<SubjectSuccess | SubjectError>;
  private loggedInSubject$: Subject<SubjectSuccess | SubjectError>;
  private userSubject$: BehaviorSubject<User | null>;
  signedIn$: Observable<SubjectSuccess | SubjectError>;
  loggedIn$: Observable<SubjectSuccess | SubjectError>;
  user$: Observable<User | null>;
  user: User | null;
  onLogoutState: { [key: string]: any };

  get isAuthenticated(): boolean {
    return !!this.user;
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
    private ngZone: NgZone
  ) {
    this.signedInSubject$ = new Subject<SubjectSuccess | SubjectError>();
    this.loggedInSubject$ = new Subject<SubjectSuccess | SubjectError>();
    this.userSubject$ = new BehaviorSubject<User | null>(null);

    this.signedIn$ = this.signedInSubject$.asObservable();
    this.loggedIn$ = this.loggedInSubject$.asObservable();
    this.user$ = this.userSubject$.asObservable();

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
            UserDetails,
            UserRoles
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
    additionalDetails: UserDetails
  ) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials: firebase.auth.UserCredential) =>
        this.setUserProfile(credentials, displayName, additionalDetails)
      )
      .catch(reason => {
        this.signedInSubject$.next({ error: reason });
      });
  }

  updateUserCredentials(email: string) {
    this.firebaseAuth.auth.currentUser.updateEmail(email);
  }

  setUserProfile(
    credentials: firebase.auth.UserCredential,
    displayName: string,
    additionalDetails: UserDetails
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
    additionalDetails: UserDetails
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
          .then(() => this.signedInSubject$.next({}))
      );
  }

  updateUserProfileDetails(additionalDetails?: UserDetails) {
    if (this.user) {
      this.firestoreDocumentService.setUserDetails$(
        this.user.auth.uid,
        additionalDetails
      );
    }
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
      this.router.navigate(["login"], {
        queryParams: { returnUrl: returnUrl }
      });
    } else {
      this.router.navigate(["login"], {
        state: redirectPayload
      });
    }
  }

  redirectToRegister(
    returnUrl?: string,
    redirectPayload?: { [key: string]: any }
  ) {
    this.onLogoutState = redirectPayload;
    if (returnUrl) {
      this.router.navigate(["register"], {
        queryParams: { returnUrl: returnUrl }
      });
    } else {
      this.router.navigate(["register"]);
    }
  }
}
