import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FirebaseError } from "firebase";
import { interval, Observable, of, Subscription } from "rxjs";
import { map, take, takeUntil, tap } from "rxjs/operators";
import {
  AssignmentDictEntry,
  ClassDictEntry,
  MatIconDictEntry,
  MAT_ICONS,
  SubjectDictEntry,
  UserDetailsDictEntry,
  UserRolesDictEntry
} from "../models";
import { SnackBarService } from "./snack-bar.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class DictionaryService {
  private timeout = 1000 * 60 * 10;
  private dictionariesCollection: AngularFirestoreCollection;

  // /assignment-dict
  private assignments: AssignmentDictEntry[] = [];
  private assignments$: Observable<AssignmentDictEntry[] | null>;
  private assignmentSubscription: Subscription;
  private assignmentDictCollection: AngularFirestoreCollection<
    AssignmentDictEntry
  >;

  // /class-dict
  private classes: ClassDictEntry[] = [];
  private classes$: Observable<ClassDictEntry[] | null>;
  private classSubscription: Subscription;
  private classDictCollection: AngularFirestoreCollection<ClassDictEntry>;

  // /mat-icons-dict
  private matIcons: MatIconDictEntry[] = [];
  private activeMatIcons: MatIconDictEntry[] = [];
  private activeMatIcons$: Observable<MatIconDictEntry[] | null>;
  private activeMatIconSubscription: Subscription;
  private activeMatIconDictDoc: AngularFirestoreDocument;

  // /subject-dict
  private subjects: SubjectDictEntry[] = [];
  private subjects$: Observable<SubjectDictEntry[] | null>;
  private subjectSubscription: Subscription;
  private subjectDictCollection: AngularFirestoreCollection<SubjectDictEntry>;

  // /user-details
  private userDetailsArray: UserDetailsDictEntry[] = [];
  private userDetailsArray$: Observable<UserDetailsDictEntry[] | null>;
  private userDetailsSubscription: Subscription;
  private userDetailsDictCollection: AngularFirestoreCollection<
    UserDetailsDictEntry
  >;

  // /user-roles
  private userRolesArray: UserRolesDictEntry[] = [];
  private userRolesArray$: Observable<UserRolesDictEntry[] | null>;
  private userRolesSubscription: Subscription;
  private userRolesDictCollection: AngularFirestoreCollection<
    UserRolesDictEntry
  >;

  constructor(
    private fireStoreService: AngularFirestore,
    private snackBarService: SnackBarService
  ) {
    this.dictionariesCollection = this.fireStoreService.collection(
      "/dictionaries"
    );

    // /assignment-dict
    this.assignmentDictCollection = this.fireStoreService.collection<
      AssignmentDictEntry
    >("assignment-dict");
    this.assignments$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.assignments = null)),
      map(_ => this.assignments)
    );

    // /class-dict
    this.classDictCollection = this.fireStoreService.collection<ClassDictEntry>(
      "/class-dict"
    );
    this.classes$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.classes = null)),
      map(_ => this.classes)
    );

    // /mat-icons-dict
    this.activeMatIconDictDoc = this.dictionariesCollection.doc("mat-icons");
    this.activeMatIcons$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => {
        this.matIcons = null;
        this.activeMatIcons = null;
      }),
      map(_ => this.activeMatIcons)
    );

    // /subject-dict
    this.subjectDictCollection = this.fireStoreService.collection<
      SubjectDictEntry
    >("/subject-dict");
    this.subjects$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.subjects = null)),
      map(_ => this.subjects)
    );

    // /user-details
    this.userDetailsDictCollection = this.fireStoreService.collection<
      UserDetailsDictEntry
    >("/user-details");
    this.userDetailsArray$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.userDetailsArray = null)),
      map(_ => this.userDetailsArray)
    );

    // /user-roles
    this.userRolesDictCollection = this.fireStoreService.collection<
      UserRolesDictEntry
    >("/user-roles");
    this.userRolesArray$ = interval(this.timeout).pipe(
      untilDestroyed(this),
      tap(_ => (this.subjects = null)),
      map(_ => this.subjects)
    );
  }

  // /assignment-dict
  getAllAssignments$(sync?: boolean): Observable<AssignmentDictEntry[]> {
    return !!sync || this.assignments.length === 0
      ? this.assignmentDictCollection.valueChanges().pipe(
          takeUntil(this.assignments$),
          untilDestroyed(this),
          tap((assignments: AssignmentDictEntry[]) => {
            this.assignments = assignments;
            if (this.assignmentSubscription) {
              this.assignmentSubscription.unsubscribe();
            }
            this.assignmentSubscription = this.assignments$.subscribe();
          })
        )
      : of(this.assignments);
  }

  async createAssignment(
    assignment: AssignmentDictEntry,
    showNotification: boolean = true
  ): Promise<AssignmentDictEntry | null> {
    assignment.uid = this.fireStoreService.createId();
    return this.assignmentDictCollection
      .doc<AssignmentDictEntry>(assignment.uid)
      .set(assignment)
      .then(() => {
        this.assignments = [...this.assignments, assignment];
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateAssignmentSuccess(assignment);
        }
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.assignments = null;
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateAssignmentFailed(error);
        }
        return null;
      });
  }

  async editAssignment(
    assignment: AssignmentDictEntry,
    showNotification: boolean = true
  ): Promise<AssignmentDictEntry | null> {
    return this.assignmentDictCollection
      .doc<AssignmentDictEntry>(assignment.uid)
      .set(assignment)
      .then(() => {
        this.assignments.splice(
          this.assignments.findIndex(
            (_: AssignmentDictEntry) => _.uid === assignment.uid
          ),
          1,
          assignment
        );
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditAssignmentSuccess(assignment);
        }
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.assignments = null;
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditAssignmentFailed(error);
        }
        return null;
      });
  }

  async deleteAssignment(
    assignment: AssignmentDictEntry,
    showNotification: boolean = true
  ) {
    this.assignmentDictCollection
      .doc<AssignmentDictEntry>(assignment.uid)
      .delete()
      .then(() => {
        this.assignments.splice(
          this.assignments.findIndex(
            (_: AssignmentDictEntry) => _.uid === assignment.uid
          ),
          1
        );
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteAssignmentSuccess(assignment);
        }
        return assignment;
      })
      .catch((error: FirebaseError) => {
        this.assignments = null;
        if (this.assignmentSubscription) {
          this.assignmentSubscription.unsubscribe();
        }
        this.assignmentSubscription = this.assignments$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteAssignmentFailed(error);
        }
        return null;
      });
  }

  // /class-dict
  getAllClasses$(sync?: boolean): Observable<ClassDictEntry[]> {
    return !!sync || this.classes.length === 0
      ? this.classDictCollection.valueChanges().pipe(
          takeUntil(this.classes$),
          untilDestroyed(this),
          tap((classes: ClassDictEntry[]) => {
            this.classes = classes;
            if (this.classSubscription) {
              this.classSubscription.unsubscribe();
            }
            this.classSubscription = this.classes$.subscribe();
          })
        )
      : of(this.classes);
  }

  getClassesByClassOnly$(): Observable<number[]> {
    return this.getAllClasses$(true).pipe(
      map((classes: ClassDictEntry[]) =>
        classes
          .map(c => c.classNo)
          .filter((c, idx, array) => array.indexOf(c) === idx)
      )
    );
  }

  getAllClassesByString$(): Observable<string[]> {
    return this.getAllClasses$(true).pipe(
      map((classes: ClassDictEntry[]) =>
        classes.map(c => `${c.classNo}${c.subclass}`)
      )
    );
  }

  async createClass(
    classObject: ClassDictEntry,
    showNotification: boolean = true
  ): Promise<ClassDictEntry | null> {
    classObject.uid = this.fireStoreService.createId();
    return this.classDictCollection
      .doc<ClassDictEntry>(classObject.uid)
      .set(classObject)
      .then(() => {
        this.classes = [...this.classes, classObject];
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateClassSuccess(classObject);
        }
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.classes = null;
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateClassFailed(error);
        }
        return null;
      });
  }

  async editClass(
    classObject: ClassDictEntry,
    showNotification: boolean = true
  ): Promise<ClassDictEntry | null> {
    return this.classDictCollection
      .doc<ClassDictEntry>(classObject.uid)
      .set(classObject)
      .then(() => {
        this.classes.splice(
          this.classes.findIndex(
            (_: ClassDictEntry) => _.uid === classObject.uid
          ),
          1,
          classObject
        );
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditClassSuccess(classObject);
        }
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.classes = null;
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditClassFailed(error);
        }
        return null;
      });
  }

  async deleteClass(
    classObject: ClassDictEntry,
    showNotification: boolean = true
  ) {
    this.classDictCollection
      .doc<ClassDictEntry>(classObject.uid)
      .delete()
      .then(() => {
        this.classes.splice(
          this.classes.findIndex(
            (_: ClassDictEntry) => _.uid === classObject.uid
          ),
          1
        );
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteClassSuccess(classObject);
        }
        return classObject;
      })
      .catch((error: FirebaseError) => {
        this.classes = null;
        if (this.classSubscription) {
          this.classSubscription.unsubscribe();
        }
        this.classSubscription = this.classes$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteClassFailed(error);
        }
        return null;
      });
  }

  // /mat-icons-dict
  getAllIcons$(sync?: boolean): Observable<MatIconDictEntry[]> {
    return !!sync || this.matIcons.length === 0
      ? this.getAllActiveIcons$(true).pipe(
          takeUntil(this.activeMatIcons$),
          untilDestroyed(this),
          map((activeIcons: MatIconDictEntry[]) => {
            const matIconsDict = MAT_ICONS.map((icon: MatIconDictEntry) => ({
              active: activeIcons.some(
                (activeIcon: MatIconDictEntry) => activeIcon.name === icon.name
              ),
              name: icon.name
            }));

            this.matIcons = matIconsDict;
            if (this.activeMatIconSubscription) {
              this.activeMatIconSubscription.unsubscribe();
            }
            this.activeMatIconSubscription = this.activeMatIcons$.subscribe();

            return this.matIcons;
          })
        )
      : of(this.matIcons);
  }

  getAllActiveIcons$(sync?: boolean): Observable<MatIconDictEntry[]> {
    return !!sync || this.activeMatIcons.length === 0
      ? this.activeMatIconDictDoc.valueChanges().pipe(
          take(1),
          takeUntil(this.activeMatIcons$),
          untilDestroyed(this),
          map((matIcons: any) => {
            const matActiveIconsDict = [];
            Object.keys(matIcons).forEach((dictKey: string) => {
              matActiveIconsDict.push({
                active: matIcons[dictKey]["active"] as boolean,
                name: matIcons[dictKey]["name"] as string
              });
            });
            this.activeMatIcons = matActiveIconsDict;
            if (this.activeMatIconSubscription) {
              this.activeMatIconSubscription.unsubscribe();
            }
            this.activeMatIconSubscription = this.activeMatIcons$.subscribe();

            return this.activeMatIcons;
          })
        )
      : of(this.activeMatIcons);
  }

  setAllActiveIcons$(
    editedMatIcon: MatIconDictEntry,
    matIcons: MatIconDictEntry[],
    showNotification: boolean = true
  ) {
    const doc = {};
    matIcons.forEach((matIcon: MatIconDictEntry) => {
      doc[matIcon.name] = {};
      doc[matIcon.name]["active"] = matIcon.active;
      doc[matIcon.name]["name"] = matIcon.name;
    });

    doc[editedMatIcon.name] = {};
    doc[editedMatIcon.name]["active"] = editedMatIcon.active;
    doc[editedMatIcon.name]["name"] = editedMatIcon.name;

    this.activeMatIconDictDoc
      .set(doc)
      .then(() => {
        if (showNotification) {
          this.snackBarService.showEditMatIconSuccess(editedMatIcon);
        }
      })
      .catch((error: FirebaseError) => {
        if (showNotification) {
          this.snackBarService.showEditMatIconFailed(error);
        }
      });
  }

  // /subject-dict
  getAllSubjects$(sync?: boolean): Observable<SubjectDictEntry[]> {
    return !!sync || this.subjects.length === 0
      ? this.subjectDictCollection.valueChanges().pipe(
          takeUntil(this.subjects$),
          untilDestroyed(this),
          tap((subjects: SubjectDictEntry[]) => {
            this.subjects = subjects;
            if (this.subjectSubscription) {
              this.subjectSubscription.unsubscribe();
            }
            this.subjectSubscription = this.subjects$.subscribe();
          })
        )
      : of(this.subjects);
  }

  async createSubject(
    subject: SubjectDictEntry,
    showNotification: boolean = true
  ): Promise<SubjectDictEntry | null> {
    subject.uid = this.fireStoreService.createId();
    return this.subjectDictCollection
      .doc<SubjectDictEntry>(subject.uid)
      .set(subject)
      .then(() => {
        this.subjects = [...this.subjects, subject];
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateSubjectSuccess(subject);
        }
        return subject;
      })
      .catch((error: FirebaseError) => {
        this.subjects = null;
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateSubjectFailed(error);
        }
        return null;
      });
  }

  async editSubject(
    subject: SubjectDictEntry,
    showNotification: boolean = true
  ): Promise<SubjectDictEntry | null> {
    return this.subjectDictCollection
      .doc<SubjectDictEntry>(subject.uid)
      .set(subject)
      .then(() => {
        this.subjects.splice(
          this.subjects.findIndex(
            (_: SubjectDictEntry) => _.uid === subject.uid
          ),
          1,
          subject
        );
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditSubjectSuccess(subject);
        }
        return subject;
      })
      .catch((error: FirebaseError) => {
        this.subjects = null;
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditSubjectFailed(error);
        }
        return null;
      });
  }

  async deleteSubject(
    subject: SubjectDictEntry,
    showNotification: boolean = true
  ) {
    this.subjectDictCollection
      .doc<SubjectDictEntry>(subject.uid)
      .delete()
      .then(() => {
        this.subjects.splice(
          this.subjects.findIndex(
            (_: SubjectDictEntry) => _.uid === subject.uid
          ),
          1
        );
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteSubjectSuccess(subject);
        }
        return subject;
      })
      .catch((error: FirebaseError) => {
        this.subjects = null;
        if (this.subjectSubscription) {
          this.subjectSubscription.unsubscribe();
        }
        this.subjectSubscription = this.subjects$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteSubjectFailed(error);
        }
        return null;
      });
  }

  // /user-details
  getUserDetails$(
    studentClass: string,
    studentNo: number
  ): Observable<UserDetailsDictEntry[]> {
    return this.fireStoreService
      .collection<UserDetailsDictEntry>("user-details", ref =>
        ref
          .where("studentClass", "==", studentClass)
          .where("studentNo", "==", studentNo)
      )
      .valueChanges()
      .pipe(untilDestroyed(this));
  }

  getAllUserDetails$(sync?: boolean): Observable<UserDetailsDictEntry[]> {
    return !!sync || this.userDetailsArray.length === 0
      ? this.userDetailsDictCollection.valueChanges().pipe(
          takeUntil(this.userDetailsArray$),
          untilDestroyed(this),
          tap((userDetailsArray: UserDetailsDictEntry[]) => {
            this.userDetailsArray = userDetailsArray;
            if (this.userDetailsSubscription) {
              this.userDetailsSubscription.unsubscribe();
            }
            this.userDetailsSubscription = this.userDetailsArray$.subscribe();
          })
        )
      : of(this.userDetailsArray);
  }

  async createUserDetails(
    userDetails: UserDetailsDictEntry,
    showNotification: boolean = true
  ): Promise<UserDetailsDictEntry | null> {
    userDetails.uid = this.fireStoreService.createId();
    return this.userDetailsDictCollection
      .doc<UserDetailsDictEntry>(userDetails.uid)
      .set(userDetails)
      .then(() => {
        this.userDetailsArray = [...this.userDetailsArray, userDetails];
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateUserDetailsSuccess(userDetails);
        }
        return userDetails;
      })
      .catch((error: FirebaseError) => {
        this.userDetailsArray = null;
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateUserDetailsFailed(error);
        }
        return null;
      });
  }

  async editUserDetails(
    userDetails: UserDetailsDictEntry,
    showNotification: boolean = true
  ): Promise<UserDetailsDictEntry | null> {
    return this.userDetailsDictCollection
      .doc<UserDetailsDictEntry>(userDetails.uid)
      .set(userDetails)
      .then(() => {
        this.userDetailsArray.splice(
          this.userDetailsArray.findIndex(
            (_: UserDetailsDictEntry) => _.uid === userDetails.uid
          ),
          1,
          userDetails
        );
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditUserDetailsSuccess(userDetails);
        }
        return userDetails;
      })
      .catch((error: FirebaseError) => {
        this.userDetailsArray = null;
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditUserDetailsFailed(error);
        }
        return null;
      });
  }

  async deleteUserDetails(
    userDetails: UserDetailsDictEntry,
    showNotification: boolean = true
  ) {
    this.userDetailsDictCollection
      .doc<UserDetailsDictEntry>(userDetails.uid)
      .delete()
      .then(() => {
        this.userDetailsArray.splice(
          this.userDetailsArray.findIndex(
            (_: UserDetailsDictEntry) => _.uid === userDetails.uid
          ),
          1
        );
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteUserDetailsSuccess(userDetails);
        }
        return userDetails;
      })
      .catch((error: FirebaseError) => {
        this.userDetailsArray = null;
        if (this.userDetailsSubscription) {
          this.userDetailsSubscription.unsubscribe();
        }
        this.userDetailsSubscription = this.userDetailsArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteUserDetailsFailed(error);
        }
        return null;
      });
  }

  // /user-roles
  getAllUserRoles$(sync?: boolean): Observable<UserRolesDictEntry[]> {
    return !!sync || this.userRolesArray.length === 0
      ? this.userRolesDictCollection.valueChanges().pipe(
          takeUntil(this.userRolesArray$),
          untilDestroyed(this),
          tap((userRolesArray: UserRolesDictEntry[]) => {
            this.userRolesArray = userRolesArray;
            if (this.userRolesSubscription) {
              this.userRolesSubscription.unsubscribe();
            }
            this.userRolesSubscription = this.userRolesArray$.subscribe();
          })
        )
      : of(this.userRolesArray);
  }

  async createUserRoles(
    userRoles: UserRolesDictEntry,
    showNotification: boolean = true
  ): Promise<UserRolesDictEntry | null> {
    userRoles.uid = this.fireStoreService.createId();
    return this.userRolesDictCollection
      .doc<UserRolesDictEntry>(userRoles.uid)
      .set(userRoles)
      .then(() => {
        this.userRolesArray = [...this.userRolesArray, userRoles];
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateUserRolesSuccess(userRoles);
        }
        return userRoles;
      })
      .catch((error: FirebaseError) => {
        this.userRolesArray = null;
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showCreateUserRolesFailed(error);
        }
        return null;
      });
  }

  async editUserRoles(
    userRoles: UserRolesDictEntry,
    showNotification: boolean = true
  ): Promise<UserRolesDictEntry | null> {
    return this.userRolesDictCollection
      .doc<UserRolesDictEntry>(userRoles.uid)
      .set(userRoles)
      .then(() => {
        this.userRolesArray.splice(
          this.userRolesArray.findIndex(
            (_: UserRolesDictEntry) => _.uid === userRoles.uid
          ),
          1,
          userRoles
        );
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditUserRolesSuccess(userRoles);
        }
        return userRoles;
      })
      .catch((error: FirebaseError) => {
        this.userRolesArray = null;
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showEditUserRolesFailed(error);
        }
        return null;
      });
  }

  async deleteUserRoles(
    userRoles: UserRolesDictEntry,
    showNotification: boolean = true
  ) {
    this.userRolesDictCollection
      .doc<UserRolesDictEntry>(userRoles.uid)
      .delete()
      .then(() => {
        this.userRolesArray.splice(
          this.userRolesArray.findIndex(
            (_: UserRolesDictEntry) => _.uid === userRoles.uid
          ),
          1
        );
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteUserRolesSuccess(userRoles);
        }
        return userRoles;
      })
      .catch((error: FirebaseError) => {
        this.userRolesArray = null;
        if (this.userRolesSubscription) {
          this.userRolesSubscription.unsubscribe();
        }
        this.userRolesSubscription = this.userRolesArray$.subscribe();
        if (showNotification) {
          this.snackBarService.showDeleteUserRolesFailed(error);
        }
        return null;
      });
  }
}
