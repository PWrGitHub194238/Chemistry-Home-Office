import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AssignmentDictEntry } from "../models/dictionaries/assignment-dict-entry.model";
import { ClassDictEntry } from "../models/dictionaries/class-dict-entry.model";
import { LessonDictEntry } from "../models/dictionaries/lesson-dict-entry.model";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class DictionaryService {
  private classes: ClassDictEntry[];
  private lessons: LessonDictEntry[];
  private assignments: AssignmentDictEntry[];

  private classDictCollection: AngularFirestoreCollection<ClassDictEntry>;
  private lessonDictCollection: AngularFirestoreCollection<LessonDictEntry>;
  private assignmentDictCollection: AngularFirestoreCollection<
    AssignmentDictEntry
  >;

  constructor(private fireStoreService: AngularFirestore) {
    this.classDictCollection = this.fireStoreService.collection<ClassDictEntry>(
      "/class-dict"
    );
    this.lessonDictCollection = this.fireStoreService.collection<
      LessonDictEntry
    >("/lesson-dict");
    this.assignmentDictCollection = this.fireStoreService.collection<
      AssignmentDictEntry
    >("assignment-dict");
  }

  getClasses$(): Observable<ClassDictEntry[]> {
    return this.classes
      ? of(this.classes)
      : this.classDictCollection.valueChanges().pipe(
          untilDestroyed(this),
          tap((classes: ClassDictEntry[]) => (this.classes = classes))
        );
  }

  getLessons$(): Observable<LessonDictEntry[]> {
    return this.lessons
      ? of(this.lessons)
      : this.lessonDictCollection.valueChanges().pipe(
          untilDestroyed(this),
          tap((lessons: LessonDictEntry[]) => (this.lessons = lessons))
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
}
