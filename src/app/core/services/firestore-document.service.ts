import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HomeworkPath, SentHomework } from "src/app/models";
import { UserDetails, UserRoles } from "../models";

@Injectable({
  providedIn: "root"
})
export class FirestoreDocumentService {
  private homeworkPathCollection: AngularFirestoreCollection<HomeworkPath>;
  private sentHomeworkCollection: AngularFirestoreCollection<SentHomework>;
  private userDetailsCollection: AngularFirestoreCollection<UserDetails>;
  private userRolesCollection: AngularFirestoreCollection<UserRoles>;

  constructor(private fireStoreService: AngularFirestore) {
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
          .where("class", "==", studentClassNumber)
          .orderBy("date")
      )
      .valueChanges();
  }

  getAllHomeworkPaths$(): Observable<HomeworkPath[]> {
    return this.homeworkPathCollection.valueChanges();
  }

  getHomeworkPaths$(uid: string): Observable<HomeworkPath> {
    return this.homeworkPathCollection
      .doc<HomeworkPath>(uid)
      .get()
      .pipe(map(document => this.getHomeworkPaths(document)));
  }

  createHomeworkPath(homeworkPath: HomeworkPath): HomeworkPath {
    homeworkPath.uid = this.fireStoreService.createId();
    homeworkPath.date = new Date();
    this.homeworkPathCollection
      .doc<HomeworkPath>(homeworkPath.uid)
      .set(homeworkPath);

    return homeworkPath;
  }

  createSentHomework(sentHomework: SentHomework): SentHomework {
    sentHomework.uid = this.fireStoreService.createId();
    this.sentHomeworkCollection
      .doc<SentHomework>(sentHomework.uid)
      .set(sentHomework);

    return sentHomework;
  }

  getUserDetails$(uid: string): Observable<UserDetails> {
    return this.userDetailsCollection
      .doc<UserDetails>(uid)
      .get()
      .pipe(map(document => this.getUserDetails(document)));
  }

  setUserDetails$(uid: string, userDetails: UserDetails): Promise<void> {
    userDetails.uid = uid;
    return this.userDetailsCollection
      .doc<UserDetails>(uid)
      .set({ ...userDetails });
  }

  setUserRoles$(uid: string, userRoles: UserRoles): Promise<void> {
    userRoles.uid = uid;
    return this.userRolesCollection.doc<UserRoles>(uid).set({ ...userRoles });
  }

  getUserRoles$(uid: string): Observable<UserRoles> {
    return this.userRolesCollection
      .doc<UserRoles>(uid)
      .get()
      .pipe(map(document => this.getUserRoles(document)));
  }

  private getHomeworkPaths(
    document: firebase.firestore.DocumentData
  ): HomeworkPath {
    return {
      uid: document.get("uid"),
      active: document.get("active"),
      date: document.get("date"),
      subject: document.get("subject"),
      class: document.get("class"),
      topic: document.get("topic"),
      assignments: document.get("assignments")
    };
  }

  private getUserDetails(
    document: firebase.firestore.DocumentData
  ): UserDetails {
    return {
      uid: document.get("uid"),
      studentClass: document.get("studentClass"),
      studentNo: document.get("studentNo")
    };
  }

  private getUserRoles(document: firebase.firestore.DocumentData): UserRoles {
    return {
      uid: document.get("uid"),
      admin: document.get("admin"),
      student: document.get("student")
    };
  }
}
