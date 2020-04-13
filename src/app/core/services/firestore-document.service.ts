import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HomeworkPath, SentHomework } from "src/app/models";
import { UserDetails, UserRoles } from "../models";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";
import { SnackBarService } from "./snack-bar.service";
import { FirebaseError } from "firebase";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class FirestoreDocumentService {
  private homeworkPathCollection: AngularFirestoreCollection<HomeworkPath>;
  private sentHomeworkCollection: AngularFirestoreCollection<SentHomework>;
  private userDetailsCollection: AngularFirestoreCollection<UserDetails>;
  private userRolesCollection: AngularFirestoreCollection<UserRoles>;

  constructor(
    private fireStoreService: AngularFirestore,
    private snackBarService: SnackBarService
  ) {
    this.homeworkPathCollection = this.fireStoreService.collection<
      HomeworkPath
    >("/homework-paths");
    this.sentHomeworkCollection = this.fireStoreService.collection<
      SentHomework
    >("/sent-homeworks");
    this.userDetailsCollection = this.fireStoreService.collection<UserDetails>(
      "/user-details"
    );
    this.userRolesCollection = this.fireStoreService.collection<UserRoles>(
      "/user-roles"
    );
  }

  getActiveHomeworkPathsForClass$(
    studentClassNumber: number
  ): Observable<HomeworkPath[]> {
    return this.fireStoreService
      .collection<HomeworkPath>("homework-paths", ref =>
        ref
          .where("active", "==", true)
          .where("classNo", "==", studentClassNumber)
          .orderBy("date")
      )
      .valueChanges()
      .pipe(untilDestroyed(this));
  }

  getAllHomeworkPaths$(): Observable<HomeworkPath[]> {
    return this.homeworkPathCollection
      .valueChanges()
      .pipe(untilDestroyed(this));
  }

  getHomeworkPaths$(uid: string): Observable<HomeworkPath | null> {
    return this.homeworkPathCollection
      .doc<HomeworkPath>(uid)
      .get()
      .pipe(
        untilDestroyed(this),
        map(document => this.getHomeworkPaths(document))
      );
  }

  async createHomeworkPath(
    homeworkPath: HomeworkPath
  ): Promise<HomeworkPath | null> {
    homeworkPath.uid = this.fireStoreService.createId();
    return this.homeworkPathCollection
      .doc<HomeworkPath>(homeworkPath.uid)
      .set(homeworkPath)
      .then(() => {
        this.snackBarService.showCreateHomeworkPathSuccess(homeworkPath);
        return homeworkPath;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showCreateHomeworkPathFailed(error);
        return null;
      });
  }

  async editHomeworkPath(
    homeworkPath: HomeworkPath
  ): Promise<HomeworkPath | null> {
    return this.homeworkPathCollection
      .doc<HomeworkPath>(homeworkPath.uid)
      .set(homeworkPath)
      .then(() => {
        this.snackBarService.showEditHomeworkPathSuccess(homeworkPath);
        return homeworkPath;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showEditHomeworkPathFailed(error);
        return null;
      });
  }

  async deleteHomeworkPath(homeworkPath: HomeworkPath) {
    this.homeworkPathCollection
      .doc<HomeworkPath>(homeworkPath.uid)
      .delete()
      .then(() => {
        this.snackBarService.showDeleteHomeworkPathSuccess(homeworkPath);
        return homeworkPath;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showDeleteHomeworkPathFailed(error);
        return null;
      });
  }

  async createSentHomework(
    sentHomework: SentHomework
  ): Promise<SentHomework | null> {
    sentHomework.uid = this.fireStoreService.createId();
    return this.sentHomeworkCollection
      .doc<SentHomework>(sentHomework.uid)
      .set(sentHomework)
      .then(() => sentHomework)
      .catch((error: FirebaseError) => null);
  }

  getUserDetails$(uid: string): Observable<UserDetails | null> {
    return this.userDetailsCollection
      .doc<UserDetails>(uid)
      .get()
      .pipe(map(document => this.getUserDetails(document)));
  }

  setUserDetails$(uid: string, userDetails: UserDetails): Promise<void> {
    userDetails.uid = uid;
    return this.userDetailsCollection.doc<UserDetails>(uid).set(userDetails);
  }

  setUserRoles$(uid: string, userRoles: UserRoles): Promise<void> {
    userRoles.uid = uid;
    return this.userRolesCollection.doc<UserRoles>(uid).set({ ...userRoles });
  }

  getUserRoles$(uid: string): Observable<UserRoles | null> {
    return this.userRolesCollection
      .doc<UserRoles>(uid)
      .get()
      .pipe(
        untilDestroyed(this),
        map(document => this.getUserRoles(document))
      );
  }

  getUserRolesOrCreateDefault$(uid: string): Observable<UserRoles | null> {
    const defaultUserRoles: UserRoles = {
      uid,
      admin: false,
      student: true
    };

    return this.getUserRoles$(uid).pipe(
      switchMap((userRoles: UserRoles | null) =>
        userRoles
          ? of(userRoles)
          : this.setUserRoles$(uid, defaultUserRoles)
              .then(() => defaultUserRoles)
              .catch(() => null)
      )
    );
  }

  private getHomeworkPaths(
    document: firebase.firestore.DocumentData
  ): HomeworkPath | null {
    if (!document.exists) {
      return null;
    }

    return {
      uid: document.get("uid"),
      active: document.get("active"),
      date: document.get("date"),
      subject: document.get("subject"),
      classNo: document.get("classNo"),
      topic: document.get("topic"),
      assignments: document.get("assignments")
    };
  }

  private getUserDetails(
    document: firebase.firestore.DocumentData
  ): UserDetails | null {
    if (!document.exists) {
      return null;
    }

    return {
      uid: document.get("uid"),
      studentClass: document.get("studentClass"),
      studentNo: document.get("studentNo")
    };
  }

  private getUserRoles(
    document: firebase.firestore.DocumentData
  ): UserRoles | null {
    if (!document.exists) {
      return null;
    }

    return {
      uid: document.get("uid"),
      admin: document.get("admin"),
      student: document.get("student")
    };
  }
}
