import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { HomeworkPath } from "../../models/homework-path.model";
import { FirestoreDocumentService } from "../services/firestore-document.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class HomeworkPathResolver implements Resolve<HomeworkPath> {
  constructor(private firestoreDocumentService: FirestoreDocumentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HomeworkPath> {
    const homeworkPathUid = this.resolveUidFromUrl(route);

    if (!homeworkPathUid) {
      return of(null);
    }

    return this.firestoreDocumentService
      .getHomeworkPaths$(homeworkPathUid)
      .pipe(untilDestroyed(this));
  }

  resolveUidFromUrl(route: ActivatedRouteSnapshot): string | undefined {
    if (route.paramMap.has("uid")) {
      return route.params["uid"];
    }

    return undefined;
  }
}
