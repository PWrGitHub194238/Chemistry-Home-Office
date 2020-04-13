import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { UserDetails } from "functions/src/models/user/user-details.model";
import { AuthResponse, HomeworkPath } from "src/app/models";
import { SnackBarComponent } from "src/app/public/snack-bar/snack-bar.component";
import { User } from "../models/user/user.model";
import { FirebaseError } from "firebase";

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

  showCreateHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Dodano lekcję!",
        color: "primary",
        message: `Lekcja '${homeworkPath.topic}' została dodana.`
      },
      ...this.displayDefaultconfig
    });
  }

  showCreateHomeworkPathFailed(error: FirebaseError) {
    const message = this.getMessageFromFirebaseErrorCode(error.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Coś poszło nie tak :(",
        color: "warn",
        message: `Nie udało się dodać lekcji (${message})`
      },
      ...this.displayDefaultconfig
    });
  }

  showEditHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Zmieniono lekcję!",
        color: "primary",
        message: `Lekcja '${homeworkPath.topic}' została zmieniona.`
      },
      ...this.displayDefaultconfig
    });
  }

  showEditHomeworkPathFailed(error: FirebaseError) {
    const message = this.getMessageFromFirebaseErrorCode(error.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Coś poszło nie tak :(",
        color: "warn",
        message: `Nie udało się zmodyfikować lekcji (${message})`
      },
      ...this.displayDefaultconfig
    });
  }

  showDeleteHomeworkPathSuccess(homeworkPath: HomeworkPath) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Usunięto lekcję!",
        color: "primary",
        message: `Lekcja '${homeworkPath.topic}' została usunięta.`
      },
      ...this.displayDefaultconfig
    });
  }

  showDeleteHomeworkPathFailed(error: FirebaseError) {
    const message = this.getMessageFromFirebaseErrorCode(error.code);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        header: "Coś poszło nie tak :(",
        color: "warn",
        message: `Nie udało się usunąć lekcji (${message})`
      },
      ...this.displayDefaultconfig
    });
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
