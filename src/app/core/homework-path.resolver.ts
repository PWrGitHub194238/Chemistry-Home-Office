import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { take } from "rxjs/operators";
import { HomeworkPath } from "../models/homework-path.model";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class HomeworkPathResolver implements Resolve<HomeworkPath> {
  constructor(private fireStoreService: AngularFirestore) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HomeworkPath> {
    const homeworkPathUid = this.resolveUidFromUrl(route);

    if (!homeworkPathUid) {
      return of(null);
    }

    return this.fireStoreService
      .collection<HomeworkPath[]>("homework-paths")
      .doc<HomeworkPath>(homeworkPathUid)
      .valueChanges()
      .pipe(take(1), untilDestroyed(this));
  }

  resolveUidFromUrl(route: ActivatedRouteSnapshot): string | undefined {
    if (route.paramMap.has("uid")) {
      return route.params["uid"];
    }

    return undefined;
  }
}
