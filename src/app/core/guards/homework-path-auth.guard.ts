import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { RedirectToLoginState } from "../actions/redirect-to-login-state.action";
import { AuthService } from "../services/auth.service";
import { FirestoreDocumentService } from "../services/firestore-document.service";
import { HomeworkPath } from "src/app/models";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class HomeworkPathAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private firestoreDocumentService: FirestoreDocumentService,
    private router: Router
  ) {}

  get studentClassPrefix(): number | null {
    return this.authService.user.details
      ? Number(this.authService.user.details.studentClass[0])
      : null;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const homeworkPathUid = this.resolveUidFromUrl(route, state);
    const studentClassPefix = this.studentClassPrefix;

    if (!homeworkPathUid || !studentClassPefix) {
      return of(true);
    }

    return this.firestoreDocumentService
      .getHomeworkPaths$(homeworkPathUid)
      .pipe(
        untilDestroyed(this),
        tap((homeworkPath: HomeworkPath | null) => {
          if (!homeworkPath || homeworkPath.classNo !== studentClassPefix) {
            const quardPayload = {};
            quardPayload[
              RedirectToLoginState.StudentNotAllowedForLesson
            ] = this.authService.user;
            this.authService.redirectToLogin(state.url, quardPayload);
          }
        }),
        map((homeworkPath: HomeworkPath | null) => !!homeworkPath),
        take(1)
      );
  }

  resolveUidFromUrl(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string | undefined {
    if (route.paramMap.has("uid")) {
      return route.params["uid"];
    }

    const urlFragments = state.url.split("/");

    return urlFragments.length > 1 ? urlFragments[1] : undefined;
  }
}
