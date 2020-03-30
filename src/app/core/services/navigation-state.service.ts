import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class NavigationStateService {
  private stateSubject$: Subject<{ [k: string]: any }>;
  state$: Observable<{ [k: string]: any }>;

  constructor(private router: Router) {
    this.stateSubject$ = new Subject<{ [k: string]: any }>();
    this.state$ = this.stateSubject$.asObservable();

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(e => e instanceof NavigationStart),
        map(() => {
          this.stateSubject$.next(
            this.router.getCurrentNavigation().extras.state
          );
        })
      )
      .subscribe();
  }
}
