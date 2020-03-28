import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { UserDetails } from "./models/user-details.model";
import { SubjectError } from "./models/subject-error.model";
import { SubjectSuccess } from "./models/subject-success.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private signedInSubject$: Subject<SubjectSuccess | SubjectError>;
  private loggedInSubject$: Subject<SubjectSuccess | SubjectError>;
  signedIn$: Observable<SubjectSuccess | SubjectError>;
  loggedIn$: Observable<SubjectSuccess | SubjectError>;

  user: firebase.User;
  userDetails: UserDetails;

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private fireStoreService: AngularFirestore
  ) {
    this.signedInSubject$ = new Subject<SubjectError>();
    this.loggedInSubject$ = new Subject<SubjectError>();
    this.signedIn$ = this.signedInSubject$.asObservable();
    this.loggedIn$ = this.loggedInSubject$.asObservable();
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
    additionalDetails?: UserDetails
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

  setUserProfile(
    credentials: firebase.auth.UserCredential,
    displayName: string,
    additionalDetails?: UserDetails
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
    additionalDetails?: UserDetails
  ) {
    const UserDetailsCollection = this.fireStoreService.collection<UserDetails>(
      "/user-details"
    );

    UserDetailsCollection.doc(credentials.user.uid)
      .set({ ...additionalDetails })
      .then(() => this.signedInSubject$.next({}));
  }

  updateUserProfileDetails(additionalDetails?: UserDetails) {
    if (this.user) {
      const UserDetailsCollection = this.fireStoreService.collection<
        UserDetails
      >("/user-details");

      UserDetailsCollection.doc(this.user.uid).set({ ...additionalDetails });
    }
  }

  logout(onLogoutState: { [key: string]: any }) {
    this.firebaseAuth.auth
      .signOut()
      .then(() => this.redirectToLogin(null, onLogoutState));
  }

  redirectToLogin(returnUrl?: string, onLogoutState?: { [key: string]: any }) {
    if (returnUrl) {
      this.router.navigate(["login"], {
        queryParams: { returnUrl: returnUrl },
        state: onLogoutState
      });
    } else {
      this.router.navigate(["login"], {
        state: onLogoutState
      });
    }
  }

  redirectToRegister(
    returnUrl?: string,
    onLogoutState?: { [key: string]: any }
  ) {
    if (returnUrl) {
      this.router.navigate(["register"], {
        queryParams: { returnUrl: returnUrl },
        state: onLogoutState
      });
    } else {
      this.router.navigate(["register"], {
        state: onLogoutState
      });
    }
  }
}
