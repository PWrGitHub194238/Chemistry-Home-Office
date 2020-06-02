import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { FirebaseError } from "firebase";
import { Assignment } from "functions/src/models/assignment.model";
import { UserDetails } from "functions/src/models/user/user-details.model";
import {
  AuthResponse,
  Class,
  HomeworkPath,
  MatIcon,
  Subject
} from "src/app/models";
import { SnackBarComponent } from "src/app/public/snack-bar/snack-bar.component";
import { User } from "../models/user/user.model";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  private displayDefaultconfig: MatSnackBarConfig<any> = {
    horizontalPosition: "center",
    verticalPosition: "top",
    duration: 5000
  };

  constructor(private snackBar: MatSnackBar) {}

  showUserRegistered() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Udało się zarejestrować",
        color: "accent",
        message: `Cześć, Twoje konto zostało utworzone<br />
          i przypisane do klasy.<br />
          Proszę zaloguj się teraz <br />
          podanymi wcześniej adresem e-mail i hasłem.<br />
          Miłego korzystania :).`
      },
      ...this.displayDefaultconfig,
      duration: 10000
    });
  }

  showLoginError(reason: AuthResponse) {
    const message = this.getMessageFromAuthCode(reason.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd logowania",
        color: "warn",
        message
      },
      ...this.displayDefaultconfig
    });
  }

  showRegistrationError(reason: AuthResponse) {
    const message = this.getMessageFromAuthCode(reason.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd rejestracji",
        color: "warn",
        message
      },
      ...this.displayDefaultconfig
    });
  }

  showHomeworkSent(homeworkPath: HomeworkPath) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Zadanie domowe przesłane",
        color: "accent",
        message: `Dzięki za wysłanie zadania domowego!<br />
        Dotarło ono całe i zdrowe na skrzynkę pocztową nauczyciela.`
      },
      ...this.displayDefaultconfig,
      duration: 10000
    });
  }

  showNoStudentRole() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd uprawnień",
        color: "warn",
        message: `Aby mieć dostęp do tego zasobu<br />
        potrzebujesz mieć przypisane do Twojego konta prawa ucznia.`
      },
      ...this.displayDefaultconfig
    });
  }

  showNoAdminRole() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd uprawnień",
        color: "warn",
        message: `Aby mieć dostęp do tego zasobu<br />
        potrzebujesz mieć przypisane do Twojego konta prawa administratora.`
      },
      ...this.displayDefaultconfig
    });
  }

  showUserDetailsUpdated(userDetails: UserDetails) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Dane zaktualizowane",
        color: "accent",
        message: `Wylogowano Cię, aby bezpiecznie zaktualizować Twoje dane.<br />
        Zaloguj się ponownie.`
      },
      ...this.displayDefaultconfig
    });
  }

  showNoRulesInfo(user: User) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd uprawnień",
        color: "warn",
        message: `Cześć ${user.auth.displayName}, wygląda na to, że nie masz nadanych żadnych uprawnień do aplikacji.<br />
          Skontaktuj się z administratorem w celu ich nadania.`
      },
      ...this.displayDefaultconfig,
      duration: 10000
    });
  }

  showLessonInactive(homeworkPath: HomeworkPath) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Lekcja nieaktywna",
        color: "warn",
        message: `Lekcja '${homeworkPath.topic}' jest już nieaktywna<br />
        i nie można przesyłać już do niej zadań.`
      },
      ...this.displayDefaultconfig
    });
  }

  showStudentNotAllowedForLesson(user: User) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Błąd uprawnień",
        color: "warn",
        message: `Cześć ${user.auth.displayName}, wygląda na to,<br />
        że nie masz uprawnień do danej lekcji.<br />
        Czy to na pewno lekcja dla Twojej klasy (${
          user.details ? user.details.studentClass : ""
        })?`
      },
      ...this.displayDefaultconfig,
      duration: 10000
    });
  }

  showCameraAccessDenied() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Zablokowano",
        color: "warn",
        message:
          "Dostęp do aparatu nie został przydzielony, nie można robić zdjęć."
      },
      ...this.displayDefaultconfig
    });
  }

  // /homework-paths

  showCreateHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    return this.showFirebaseDocumentActionSuccess(
      "Dodano lekcję!",
      `Lekcja '${homeworkPath.topic}' została dodana.`
    );
  }

  showCreateHomeworkPathFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się dodać lekcji",
      error
    );
  }

  showEditHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    return this.showFirebaseDocumentActionSuccess(
      "Zmieniono lekcję!",
      `Lekcja '${homeworkPath.topic}' została zmieniona.`
    );
  }

  showEditHomeworkPathFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się zmodyfikować lekcji",
      error
    );
  }

  showDeleteHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    return this.showFirebaseDocumentActionSuccess(
      "Usunięto lekcję!",
      `Lekcja '${homeworkPath.topic}' została usunięta.`
    );
  }

  showDeleteHomeworkPathFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się usunąć lekcji",
      error
    );
  }

  showOnSelectedHomeworkPathLinkCopied() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        color: "primary",
        message: "Skopiowano link do lekcji!"
      },
      ...this.displayDefaultconfig,
      duration: 2000
    });
  }

  // /assignment-dict

  showCreateAssignmentSuccess(assignment: Assignment) {
    return this.showFirebaseDocumentActionSuccess(
      "Dodano zadanie!",
      `Zadanie '${assignment.name}' zostało dodane.`
    );
  }

  showCreateAssignmentFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się dodać zadania",
      error
    );
  }

  showEditAssignmentSuccess(assignment: Assignment) {
    return this.showFirebaseDocumentActionSuccess(
      "Zmieniono zadanie!",
      `Zadanie '${assignment.name}' zostało zmienione.`
    );
  }

  showEditAssignmentFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się zmienić zadania",
      error
    );
  }

  showDeleteAssignmentSuccess(assignment: Assignment) {
    return this.showFirebaseDocumentActionSuccess(
      "Usunięto zadanie!",
      `Zadanie '${assignment.name}' zostało usunięte.`
    );
  }

  showDeleteAssignmentFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się usunąć zadania",
      error
    );
  }

  // /class-dict

  showCreateClassSuccess(classObject: Class) {
    return this.showFirebaseDocumentActionSuccess(
      "Dodano klasę!",
      `Klasa '${classObject.classNo}${classObject.subclass}' została dodana.`
    );
  }

  showCreateClassFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się dodać klasy",
      error
    );
  }

  showEditClassSuccess(classObject: Class) {
    return this.showFirebaseDocumentActionSuccess(
      "Zmieniono klasę!",
      `Klasa '${classObject.classNo}${classObject.subclass}' została zmieniona.`
    );
  }

  showEditClassFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się zmienić klasy",
      error
    );
  }

  showDeleteClassSuccess(classObject: Class) {
    return this.showFirebaseDocumentActionSuccess(
      "Usunięto klasę!",
      `Klasa '${classObject.classNo}${classObject.subclass}' została usunięta.`
    );
  }

  showDeleteClassFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się usunąć klasy",
      error
    );
  }

  // /mat-icons-dict

  showEditMatIconSuccess(matIcon: MatIcon) {
    return this.showFirebaseDocumentActionSuccess(
      "Zmieniono ikonę!",
      `Ikona '${matIcon.name}' została zmieniona na ${
        matIcon.active ? "aktywną" : "nieaktywną"
      }.`
    );
  }

  showEditMatIconFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się usunąć klasy",
      error
    );
  }

  // /sent-homeworks

  // /subject-dict

  showCreateSubjectSuccess(subject: Subject) {
    return this.showFirebaseDocumentActionSuccess(
      "Dodano przedmiot lekcji!",
      `Przedmiot lekcji '${subject.name}' został dodany.`
    );
  }

  showCreateSubjectFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się dodać przedmiotu lekcji",
      error
    );
  }

  showEditSubjectSuccess(subject: Subject) {
    return this.showFirebaseDocumentActionSuccess(
      "Zmieniono przedmiot lekcji!",
      `Przedmiot lekcji '${subject.name}' został zmieniony.`
    );
  }

  showEditSubjectFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się zmienić przedmiotu lekcji",
      error
    );
  }

  showDeleteSubjectSuccess(subject: Subject) {
    return this.showFirebaseDocumentActionSuccess(
      "Usunięto przedmiot lekcji!",
      `Przedmiot lekcji '${subject.name}' został usunięty.`
    );
  }

  showDeleteSubjectFailed(error: FirebaseError) {
    return this.showFirebaseDocumentActionFailed(
      "Nie udało się usunąć przedmiotu lekcji",
      error
    );
  }

  private showFirebaseDocumentActionSuccess(header: string, message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header,
        color: "primary",
        message
      },
      ...this.displayDefaultconfig
    });
  }

  private showFirebaseDocumentActionFailed(
    action: string,
    error: FirebaseError
  ) {
    const message = this.getMessageFromFirebaseErrorCode(error.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Coś poszło nie tak :(",
        color: "warn",
        message: `${action} (${message})`
      },
      ...this.displayDefaultconfig
    });
  }

  private getMessageFromAuthCode(code: string) {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Podany użytkownik nie istnieje lub podałeś złe dane logowania";
      case "auth/email-already-in-use":
        return "Podany adres e-mail jest już zarejestrowany";
      default:
        break;
    }
  }

  private getMessageFromFirebaseErrorCode(code: string) {
    switch (code) {
      case "permission-denied":
      default:
        return "brak uprawnień";
    }
  }
}
