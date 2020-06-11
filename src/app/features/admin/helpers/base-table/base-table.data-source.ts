import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export abstract class BaseTableDataSource<T> extends MatTableDataSource<T> {
  isLoading$: Observable<boolean>;
  data$: Observable<T[]>;

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private dataSubject$ = new BehaviorSubject<T[]>([]);

  constructor() {
    super();
    this.isLoading$ = this.isLoadingSubject$.asObservable();
    this.data$ = this.dataSubject$.asObservable();
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
        this.dataSubject$.next(data);
        this.isLoadingSubject$.next(false);
      });
  }
}
