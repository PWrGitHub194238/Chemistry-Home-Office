import { MatTableDataSource } from "@angular/material/table";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { BehaviorSubject, of, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";

export class HomeworkPathsDataSource extends MatTableDataSource<HomeworkPath> {
  public isLoading$: Observable<boolean>;

  private dataSubject$ = new BehaviorSubject<HomeworkPath[]>([]);
  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  loadData() {
    this.firestoreDocumentService
      .getAllHomeworkPaths$()
      .pipe(
        tap(() => this.isLoadingSubject$.next(true)),
        catchError(() => of([]))
      )
      .subscribe(data => {
        this.isLoadingSubject$.next(false);
        this.dataSubject$.next(data);
      });
  }

  connect(): BehaviorSubject<HomeworkPath[]> {
    return this.dataSubject$;
  }

  disconnect() {
    this.dataSubject$.complete();
  }

  filterPredicate = (data: HomeworkPath, filter: string) => {
    const lowerCaseFilter = filter.toLowerCase();
    debugger;
    return isNaN(Number(filter))
      ? data.topic.toLowerCase().includes(lowerCaseFilter) ||
          data.assignments.some(assignment =>
            assignment.name.toLowerCase().includes(lowerCaseFilter)
          )
      : data.classNo === Number(filter);
  };
}
