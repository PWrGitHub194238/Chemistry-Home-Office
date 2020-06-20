import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FirebaseError } from "firebase";
import { interval, Observable, of, Subscription } from "rxjs";
import { map, switchMap, take, takeUntil, tap } from "rxjs/operators";
import { SentHomeworksForPath } from "src/app/features/admin/models";
import { HomeworkPath, SentHomework } from "src/app/models";
import {
  AssignmentDictEntry,
  ClassDictEntry,
  MatIconDictEntry,
  SubjectDictEntry,
  UserDetailsDictEntry,
  UserRolesDictEntry
} from "../models";
import { DictionaryService } from "./dictionary.service";
import { SnackBarService } from "./snack-bar.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class FirestoreDocumentService {
  private timeout = 1000 * 60 * 10;

  // /homework-paths
  private homeworkPaths: HomeworkPath[] = [];
  private homeworkPaths$: Observable<HomeworkPath[] | null>;
  private homeworkPathkSubscription: Subscription;
  private homeworkPathCollection: AngularFirestoreCollection<HomeworkPath>;

  // /sent-homeworks
  private sentHomeworks: SentHomework[] = [];
  private sentHomeworks$: Observable<SentHomework[] | null>;
  private sentHomeworkSubscription: Subscription;
  private sentHomeworkCollection: AngularFirestoreCollection<SentHomework>;

  // SentHomeworksForPath
  private sentHomeworksForPaths: SentHomeworksForPath[] = [];
  private sentHomeworksForPaths$: Observable<SentHomeworksForPath[] | null>;
  private sentHomeworksForPathSubscription: Subscription;

  private userDetailsCollection: AngularFirestoreCollection<
    UserDetailsDictEntry
  >;
  private userRolesCollection: AngularFirestoreCollection<UserRolesDictEntry>;

  constructor(
    private fireStoreService: AngularFirestore,
    private dictionaryService: DictionaryService,
    private snackBarService: SnackBarService
  ) {
    // /homework-paths
    this.homeworkPathCollection = this.fireStoreService.collection<
      HomeworkPath
    >("/homework-paths");
    this.homeworkPaths$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.homeworkPaths = null)),
      map(_ => this.homeworkPaths)
    );

    // /sent-homeworks
    this.sentHomeworkCollection = this.fireStoreService.collection<
      SentHomework
    >("/sent-homeworks");
    this.sentHomeworks$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.sentHomeworks = null)),
      map(_ => this.sentHomeworks)
    );
    this.sentHomeworksForPaths$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.sentHomeworksForPaths = null)),
      map(_ => this.sentHomeworksForPaths)
    );

    this.userDetailsCollection = this.fireStoreService.collection<
      UserDetailsDictEntry
    >("/user-details");
    this.userRolesCollection = this.fireStoreService.collection<
      UserRolesDictEntry
    >("/user-roles");
  }

  // /assignment-dict
  getAllAssignments$(): Observable<AssignmentDictEntry[]> {
    return this.dictionaryService.getAllAssignments$();
  }

  // /class-dict
  getAllClasses$(): Observable<ClassDictEntry[]> {
    return this.dictionaryService.getAllClasses$();
  }

  // /mat-icons-dict
  getAllIcons$(): Observable<MatIconDictEntry[]> {
    return this.dictionaryService.getAllIcons$();
  }

  // /subject-dict
  getAllSubjects$(): Observable<SubjectDictEntry[]> {
    return this.dictionaryService.getAllSubjects$();
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

  getAllHomeworkPaths$(sync?: boolean): Observable<HomeworkPath[]> {
    return !!sync || this.homeworkPaths.length === 0
      ? this.homeworkPathCollection.valueChanges().pipe(
          takeUntil(this.homeworkPaths$),
          untilDestroyed(this),
          tap((homeworkPaths: HomeworkPath[]) => {
            this.homeworkPaths = homeworkPaths;
            if (this.homeworkPathkSubscription) {
              this.homeworkPathkSubscription.unsubscribe();
            }
            this.homeworkPathkSubscription = this.homeworkPaths$.subscribe();
          })
        )
      : of(this.homeworkPaths);
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

  async createHomeworkPath$(
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

  async editHomeworkPath$(
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
  getAllSentHomeworks$(sync?: boolean): Observable<SentHomework[]> {
    return !!sync || this.sentHomeworks.length === 0
      ? this.sentHomeworkCollection.valueChanges().pipe(
          take(1),
          takeUntil(this.sentHomeworks$),
          untilDestroyed(this),
          tap((sentHomeworks: SentHomework[]) => {
            this.sentHomeworks = sentHomeworks;
            if (this.sentHomeworkSubscription) {
              this.sentHomeworkSubscription.unsubscribe();
            }
            this.sentHomeworkSubscription = this.sentHomeworks$.subscribe();
          })
        )
      : of(this.sentHomeworks);
  }

  getAllSentHomeworksForPaths$(
    sync?: boolean
  ): Observable<SentHomeworksForPath[]> {
    return !!sync || this.sentHomeworksForPaths.length === 0
      ? this.getAllSentHomeworks$().pipe(
          takeUntil(this.sentHomeworksForPaths$),
          untilDestroyed(this),
          map((sentHomeworks: SentHomework[]) => {
            const sentHomeworksGroupedByPath: SentHomeworksForPath[] = [];
            const homeworkPaths: HomeworkPath[] = [];

            const groupedHomeworks = sentHomeworks.reduce(
              (
                previousValue: Map<string, SentHomework[]>,
                currentValue: SentHomework
              ) => {
                const homeworkPathUid = currentValue.homeworkPath.uid;
                if (!previousValue[homeworkPathUid]) {
                  homeworkPaths.push(currentValue.homeworkPath);
                  previousValue[homeworkPathUid] = [];
                }

                previousValue[homeworkPathUid].push(currentValue);
                return previousValue;
              },
              new Map<string, SentHomework[]>()
            );

            homeworkPaths.forEach((homeworkPath: HomeworkPath) => {
              sentHomeworksGroupedByPath.push({
                ...homeworkPath,
                sentHomeworks: groupedHomeworks[homeworkPath.uid]
              });
            });

            this.sentHomeworksForPaths = sentHomeworksGroupedByPath;
            if (this.sentHomeworksForPathSubscription) {
              this.sentHomeworksForPathSubscription.unsubscribe();
            }
            this.sentHomeworksForPathSubscription = this.sentHomeworksForPaths$.subscribe();
            return sentHomeworksGroupedByPath;
          })
        )
      : of(this.sentHomeworksForPaths);
  }

  async createSentHomework$(
    sentHomework: SentHomework
  ): Promise<SentHomework | null> {
    sentHomework.uid = this.fireStoreService.createId();
    return this.sentHomeworkCollection
      .doc<SentHomework>(sentHomework.uid)
      .set(sentHomework)
      .then(() => sentHomework)
      .catch((error: FirebaseError) => null);
  }

  async editSentHomework$(
    sentHomework: SentHomework
  ): Promise<SentHomework | null> {
    return this.sentHomeworkCollection
      .doc<SentHomework>(sentHomework.uid)
      .set(sentHomework)
      .then(() => {
        this.snackBarService.showEditSentHomeworkSuccess(sentHomework);
        return sentHomework;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showEditSentHomeworkFailed(error);
        return null;
      });
  }

  async deleteSentHomework(sentHomework: SentHomework) {
    this.sentHomeworkCollection
      .doc<SentHomework>(sentHomework.uid)
      .delete()
      .then(() => {
        this.snackBarService.showDeleteSentHomeworkSuccess(sentHomework);
        return sentHomework;
      })
      .catch((error: FirebaseError) => {
        this.snackBarService.showDeleteSentHomeworkFailed(error);
        return null;
      });
  }

  // /user-details
  getUserDetails$(uid: string): Observable<UserDetailsDictEntry | null> {
    return this.userDetailsCollection
      .doc<UserDetailsDictEntry>(uid)
      .get()
      .pipe(map(document => this.getUserDetails(document)));
  }

  setUserDetails$(
    uid: string,
    userDetails: UserDetailsDictEntry
  ): Promise<void> {
    userDetails.uid = uid;
    return this.userDetailsCollection
      .doc<UserDetailsDictEntry>(uid)
      .set(userDetails);
  }

  // /user-roles
  getUserRoles$(uid: string): Observable<UserRolesDictEntry | null> {
    return this.userRolesCollection
      .doc<UserRolesDictEntry>(uid)
      .get()
      .pipe(
        untilDestroyed(this),
        map(document => this.getUserRoles(document))
      );
  }

  getUserRolesOrCreateDefault$(
    uid: string
  ): Observable<UserRolesDictEntry | null> {
    const defaultUserRoles: UserRolesDictEntry = {
      uid,
      admin: false,
      student: true
    };

    return this.getUserRoles$(uid).pipe(
      switchMap((userRoles: UserRolesDictEntry | null) =>
        userRoles
          ? of(userRoles)
          : this.setUserRoles$(uid, defaultUserRoles)
              .then(() => defaultUserRoles)
              .catch(() => null)
      )
    );
  }

  setUserRoles$(uid: string, userRoles: UserRolesDictEntry): Promise<void> {
    userRoles.uid = uid;
    return this.userRolesCollection
      .doc<UserRolesDictEntry>(uid)
      .set({ ...userRoles });
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
  ): UserDetailsDictEntry | null {
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
  ): UserRolesDictEntry | null {
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
