import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { HomeworkPath } from "../models/homework-path.model";
import { AuthResponse } from "../models/auth-response.model";
import { SnackBarComponent } from "../public/snack-bar/snack-bar.component";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  private displayDefaultconfig: MatSnackBarConfig<any> = {
    horizontalPosition: "center",
    verticalPosition: "top",
    duration: 3000
  };

  constructor(private snackBar: MatSnackBar) {}

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

  getMessageFromAuthCode(code: string) {
    switch (code) {
      case "auth/user-not-found":
        return "Podany użytkownik nie istnieje lub podałeś złe dane logowania";
      case "auth/email-already-in-use":
        return "Podany adres e-mail jest już zarejestrowany";
      default:
        break;
    }
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
        message: `Dzięki za wysłanie zadania domowego! <br />
        Dotarło ono całe i zdrowe na skrzynkę pocztową nauczyciela.`
      },
      ...this.displayDefaultconfig,
      duration: 5000
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
}
