import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export abstract class BaseTablePanelDataSource<T> extends MatTableDataSource<
  T
> {
  public isLoading$: Observable<boolean>;

  private dataSubject$ = new BehaviorSubject<T[]>([]);
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
        this.isLoadingSubject$.next(false);
        this.dataSubject$.next(data);
      });
  }

  connect(): BehaviorSubject<T[]> {
    return this.dataSubject$;
  }

  disconnect() {
    this.dataSubject$.complete();
  }
}
