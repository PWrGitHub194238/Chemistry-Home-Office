import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FirebaseError } from "firebase";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {
  Assignment,
  Class,
  HomeworkPath,
  MatIcon,
  SentHomework
} from "src/app/models";
import { UserDetails, UserRoles } from "../models";
import { SnackBarService } from "./snack-bar.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class FirestoreDocumentService {
  private dictionariesCollection: AngularFirestoreCollection;
  private assignmentPathCollection: AngularFirestoreCollection<Assignment>;
  private classPathCollection: AngularFirestoreCollection<Class>;
  private homeworkPathCollection: AngularFirestoreCollection<HomeworkPath>;
  private sentHomeworkCollection: AngularFirestoreCollection<SentHomework>;
  private userDetailsCollection: AngularFirestoreCollection<UserDetails>;
  private userRolesCollection: AngularFirestoreCollection<UserRoles>;

  constructor(
    private fireStoreService: AngularFirestore,
    private snackBarService: SnackBarService
  ) {
    this.dictionariesCollection = this.fireStoreService.collection(
      "/dictionaries"
    );
    this.assignmentPathCollection = this.fireStoreService.collection<
      Assignment
    >("/assignment-dict");
    this.classPathCollection = this.fireStoreService.collection<Class>(
      "/class-dict"
    );
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

  // /assignment-dict

  getAllAssignments$(): Observable<Assignment[]> {
    return this.assignmentPathCollection
      .valueChanges()
      .pipe(untilDestroyed(this));
  }

  async createAssignment(assignment: Assignment): Promise<Assignment | null> {
    assignment.uid = this.fireStoreService.createId();
    return this.assignmentPathCollection
      .doc<Assignment>(assignment.uid)
      .set(assignment)
      .then(() => {
        this.snackBarService.showCreateAssignmentSuccess(assignment);
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showCreateAssignmentFailed(error);
        return null;
      });
  }

  async editAssignment(assignment: Assignment): Promise<Assignment | null> {
    return this.assignmentPathCollection
      .doc<Assignment>(assignment.uid)
      .set(assignment)
      .then(() => {
        this.snackBarService.showEditAssignmentSuccess(assignment);
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showEditAssignmentFailed(error);
        return null;
      });
  }

  async deleteAssignment(assignment: Assignment) {
    this.assignmentPathCollection
      .doc<Assignment>(assignment.uid)
      .delete()
      .then(() => {
        this.snackBarService.showDeleteAssignmentSuccess(assignment);
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showDeleteAssignmentFailed(error);
        return null;
      });
  }

  // /class-dict

  getAllClasses$(): Observable<Class[]> {
    return this.classPathCollection.valueChanges().pipe(untilDestroyed(this));
  }

  async createClass(classObject: Class): Promise<Class | null> {
    classObject.uid = this.fireStoreService.createId();
    return this.classPathCollection
      .doc<Class>(classObject.uid)
      .set(classObject)
      .then(() => {
        this.snackBarService.showCreateClassSuccess(classObject);
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showCreateClassFailed(error);
        return null;
      });
  }

  async editClass(classObject: Class): Promise<Class | null> {
    return this.classPathCollection
      .doc<Class>(classObject.uid)
      .set(classObject)
      .then(() => {
        this.snackBarService.showEditClassSuccess(classObject);
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showEditClassFailed(error);
        return null;
      });
  }

  async deleteClass(classObject: Class) {
    this.classPathCollection
      .doc<Class>(classObject.uid)
      .delete()
      .then(() => {
        this.snackBarService.showDeleteClassSuccess(classObject);
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showDeleteClassFailed(error);
        return null;
      });
  }

  // /mat-icons-dict

  getAllActiveIcons$(): Observable<MatIcon[]> {
    return this.dictionariesCollection
      .doc("mat-icons")
      .valueChanges()
      .pipe(
        untilDestroyed(this),
        map(doc => {
          return Object.keys(doc).map((key: string) => ({
            active: doc[key]["active"] as boolean,
            name: doc[key]["name"] as string
          }));
        })
      );
  }

  setAllActiveIcons$(editedMatIcon: MatIcon, matIcons: MatIcon[]) {
    const doc = {};
    matIcons.forEach((matIcon: MatIcon) => {
      doc[matIcon.name] = {};
      doc[matIcon.name]["active"] = matIcon.active;
      doc[matIcon.name]["name"] = matIcon.name;
    });

    this.dictionariesCollection
      .doc("mat-icons")
      .set(doc)
      .then(() => {
        this.snackBarService.showEditMatIconSuccess(editedMatIcon);
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showEditMatIconFailed(error);
      });
  }

  // /homework-paths

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

  // /sent-homeworks

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

  // /user-details

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

  // /user-roles

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

  setUserRoles$(uid: string, userRoles: UserRoles): Promise<void> {
    userRoles.uid = uid;
    return this.userRolesCollection.doc<UserRoles>(uid).set({ ...userRoles });
  }

  // private

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
