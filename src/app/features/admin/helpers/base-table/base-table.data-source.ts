import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, take } from "rxjs/operators";

export abstract class BaseTableDataSource<T> extends MatTableDataSource<T> {
  isLoading$: Observable<boolean>;

  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);

  constructor() {
    super();
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  public loadData(sync?: boolean) {
    this.fetchData(sync);
  }

  protected abstract getData(): Observable<T[]>;

  protected updateData(data: T[]) {
    this.data = data;
    this.isLoadingSubject$.next(false);
  }

  private fetchData(sync?: boolean) {
    if (!!sync || this.data.length === 0) {
      this.isLoadingSubject$.next(true);
      this.getData()
        .pipe(
          take(1),
          catchError(() => of([]))
        )
        .subscribe(data => this.updateData(data));
    }
  }
}
