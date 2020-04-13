import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AssignmentDictEntry } from "../models/dictionaries/assignment-dict-entry.model";
import { ClassDictEntry } from "../models/dictionaries/class-dict-entry.model";
import { SubjectDictEntry } from "../models/dictionaries/subject-dict-entry.model";
import {
  MatIconDictEntry,
  matIconDict
} from "../models/dictionaries/mat-icon-dict-entry.model";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class DictionaryService {
  private classes: ClassDictEntry[];
  private subjects: SubjectDictEntry[];
  private assignments: AssignmentDictEntry[];
  private matIcons: MatIconDictEntry[];

  private classDictCollection: AngularFirestoreCollection<ClassDictEntry>;
  private subjectDictCollection: AngularFirestoreCollection<SubjectDictEntry>;
  private assignmentDictCollection: AngularFirestoreCollection<
    AssignmentDictEntry
  >;

  private dictionaryCollection: AngularFirestoreCollection;

  private matIconDictDoc: AngularFirestoreDocument;

  constructor(private fireStoreService: AngularFirestore) {
    this.classDictCollection = this.fireStoreService.collection<ClassDictEntry>(
      "/class-dict"
    );
    this.subjectDictCollection = this.fireStoreService.collection<
      SubjectDictEntry
    >("/subject-dict");
    this.assignmentDictCollection = this.fireStoreService.collection<
      AssignmentDictEntry
    >("assignment-dict");

    this.dictionaryCollection = this.fireStoreService.collection(
      "dictionaries"
    );

    this.matIconDictDoc = this.dictionaryCollection.doc("mat-icons");
  }

  getClasses$(): Observable<ClassDictEntry[]> {
    return this.classes
      ? of(this.classes)
      : this.classDictCollection.valueChanges().pipe(
          untilDestroyed(this),
          tap((classes: ClassDictEntry[]) => (this.classes = classes))
        );
  }

  getClassesByClassOnly$(): Observable<number[]> {
    return this.getClasses$().pipe(
      map((classes: ClassDictEntry[]) =>
        classes
          .map(c => c.classNo)
          .filter((c, idx, array) => array.indexOf(c) === idx)
      )
    );
  }

  getSubjects$(): Observable<SubjectDictEntry[]> {
    return this.subjects
      ? of(this.subjects)
      : this.subjectDictCollection.valueChanges().pipe(
          untilDestroyed(this),
          tap((subjects: SubjectDictEntry[]) => (this.subjects = subjects))
        );
  }

  getAssignments$(): Observable<AssignmentDictEntry[]> {
    return this.assignments
      ? of(this.assignments)
      : this.assignmentDictCollection.valueChanges().pipe(
          untilDestroyed(this),
          tap(
            (assignments: AssignmentDictEntry[]) =>
              (this.assignments = assignments)
          )
        );
  }

  getMatIcons$(): Observable<MatIconDictEntry[]> {
    return this.matIcons
      ? of(this.matIcons)
      : this.matIconDictDoc.valueChanges().pipe(
          untilDestroyed(this),
          map((matIcons: any) => {
            this.matIcons = [];
            if (matIcons) {
              Object.keys(matIcons).forEach((dictKey: string) => {
                this.matIcons.push({
                  name: matIcons[dictKey]["name"] as string,
                  active: matIcons[dictKey]["active"] as boolean
                });
              });
            }
            return this.matIcons;
          })
        );
  }

  getActiveMatIcons$(): Observable<MatIconDictEntry[]> {
    return this.getMatIcons$().pipe(
      map((matIcons: MatIconDictEntry[]) =>
        matIcons.filter((matIcon: MatIconDictEntry) => matIcon.active)
      )
    );
  }
}
