import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { AngularFireFunctions } from "@angular/fire/functions";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";
import { SentHomework } from "src/app/models";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class EmailSenderService {
  private emailSentSubject$: Subject<any>;
  emailSent$: Observable<any>;

  constructor(private fireFunctionsService: AngularFireFunctions) {
    this.emailSentSubject$ = new Subject<any>();
    this.emailSent$ = this.emailSentSubject$.asObservable();
  }

  sendNewHomework(sentHomework: SentHomework) {
    const callable = this.fireFunctionsService.httpsCallable(
      "sendHomeworkSentNotificationEmail"
    );
    callable({ uid: sentHomework.uid })
      .pipe(untilDestroyed(this))
      .subscribe(
        resp => {
          debugger;
          if (resp["error"]) {
            this.emailSentSubject$.next({ error: resp["error"] });
          } else {
            this.emailSentSubject$.next(resp);
          }
        },
        err => {
          debugger;
          this.emailSentSubject$.next({ error: err });
        }
      );
  }
}
