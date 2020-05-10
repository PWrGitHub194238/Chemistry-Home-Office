import { MatTableDataSource } from "@angular/material/table";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { BehaviorSubject, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";

export class HomeworkPathsDataSource extends MatTableDataSource<HomeworkPath> {
  private dataSubject = new BehaviorSubject<HomeworkPath[]>([]);

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
  }

  loadData() {
    this.firestoreDocumentService
      .getAllHomeworkPaths$()
      .pipe(catchError(() => of([])))
      .subscribe(data => this.dataSubject.next(data));
  }

  connect(): BehaviorSubject<HomeworkPath[]> {
    return this.dataSubject;
  }

  disconnect() {
    this.dataSubject.complete();
  }

  filterPredicate = (data: HomeworkPath, filter: string) => {
    const lowerCaseFilter = filter.toLowerCase();
    return isNaN(Number(filter))
      ? data.topic.toLowerCase().includes(lowerCaseFilter) ||
          data.assignments.some(assignment =>
            assignment.name.toLowerCase().includes(lowerCaseFilter)
          )
      : data.classNo === Number(filter);
  };
}
