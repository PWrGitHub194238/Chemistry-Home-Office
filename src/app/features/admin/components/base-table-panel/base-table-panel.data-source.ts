import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export abstract class BaseTablePanelDataSource<T> extends MatTableDataSource<
  T
> {
  isLoading$: Observable<boolean>;

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);

  constructor() {
    super();
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  public loadData() {
    this.fetchData();
  }

  protected abstract getData(): Observable<T[]>;

  private fetchData() {
    this.getData()
      .pipe(
        tap(() => this.isLoadingSubject$.next(true)),
        catchError(() => of([]))
      )
      .subscribe(data => {
        this.data = data;
        this.isLoadingSubject$.next(false);
      });
  }
}
