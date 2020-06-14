import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { SentHomework } from "src/app/models";
import * as stringFormat from "string-format";
import { SubjectDictEntry } from "../models";
import { AuthService } from "./auth.service";
import { FirefunctionService } from "./firefunction.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class EmailSenderService {
  private emailSentSubject$: Subject<any>;
  emailSent$: Observable<any>;

  constructor(
    private fireFunctionsService: FirefunctionService,
    protected authService: AuthService
  ) {
    this.emailSentSubject$ = new Subject<any>();
    this.emailSent$ = this.emailSentSubject$.asObservable();
  }

  sendNewHomework(sentHomework: SentHomework) {
    this.fireFunctionsService
      .sendHomeworkSentNotificationEmail$(sentHomework)
      .pipe(take(1), untilDestroyed(this))
      .subscribe(
        (resp: SentHomework) => this.emailSentSubject$.next(resp),
        err => {
          this.emailSentSubject$.next({ error: err });
        }
      );
  }

  sentNewSubjectNotificationEmail(addedItem: SubjectDictEntry) {
    this.fireFunctionsService
      .sendEmail$(
        this.authService.user.auth.uid,
        this.authService.user.auth.displayName,
        addedItem.teacherEmail,
        `Utworzono nowy przedmiot lekcji: ${addedItem.name}`,
        this.sentNewSubjectNotificationEmailHtml(addedItem)
      )
      .pipe(take(1), untilDestroyed(this))
      .subscribe();
  }

  sentSubjectEmailChangedFromNotificationEmail(
    receiverEmail: string,
    subjectName: string
  ) {
    this.fireFunctionsService
      .sendEmail$(
        this.authService.user.auth.uid,
        this.authService.user.auth.displayName,
        receiverEmail,
        `Zmieniono adres e-mail dla przedmiotu lekcji: ${subjectName}`,
        this.sentSubjectEmailChangedFromNotificationEmailHtml(subjectName)
      )
      .pipe(take(1), untilDestroyed(this))
      .subscribe();
  }

  sentSubjectEmailChangedToNotificationEmail(
    receiverEmail: string,
    subjectName: string
  ) {
    this.fireFunctionsService
      .sendEmail$(
        this.authService.user.auth.uid,
        this.authService.user.auth.displayName,
        receiverEmail,
        `Zmieniono adres e-mail dla przedmiotu lekcji: ${subjectName}`,
        this.sentSubjectEmailChangedToNotificationEmailHtml(subjectName)
      )
      .pipe(take(1), untilDestroyed(this))
      .subscribe();
  }

  private sentNewSubjectNotificationEmailHtml(subject: SubjectDictEntry) {
    return stringFormat(
      `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body bgcolor="#ffffff" text="#000000">
        <p>Administrator {senderName} dodał właśnie nowy przedmiot lekcji i przypisał do niego ten adres e-mail.
        Wysyłane przez uczniów zadania z przedmiotu '{subjectName}' będą od tej pory przesyłane na ten adres e-mail.</p>
        <p>Proszę nie odpowiadaj na tę wiadomość.</p>
      </body>
    </html>`,
      {
        senderName: this.authService.user.auth.displayName,
        subjectName: subject.name
      }
    );
  }

  private sentSubjectEmailChangedFromNotificationEmailHtml(
    subjectName: string
  ): string {
    return stringFormat(
      `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body bgcolor="#ffffff" text="#000000">
        <p>Administrator {senderName} zmienił ustawienia przedmiotu lekcji.
        Wysyłane przez uczniów zadania z przedmiotu '{subjectName}' nie będą dłużej przesyłane na ten adres e-mail.</p>
        <p>Proszę nie odpowiadaj na tę wiadomość.</p>
      </body>
    </html>`,
      {
        senderName: this.authService.user.auth.displayName,
        subjectName: subjectName
      }
    );
  }

  private sentSubjectEmailChangedToNotificationEmailHtml(
    subjectName: string
  ): string {
    return stringFormat(
      `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body bgcolor="#ffffff" text="#000000">
        <p>Administrator {senderName} zmienił ustawienia przedmiotu lekcji i przypisał do niego ten adres e-mail.
        Wysyłane przez uczniów zadania z przedmiotu '{subjectName}' będą od tej pory przesyłane na ten adres e-mail.</p>
        <p>Proszę nie odpowiadaj na tę wiadomość.</p>
      </body>
    </html>`,
      {
        senderName: this.authService.user.auth.displayName,
        subjectName: subjectName
      }
    );
  }
}
