import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { FirestoreDocumentService } from "../services/firestore-document.service";
import { UserDetails } from "../models/User/user-details.model";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class UserDetailsResolver {
  constructor(
    private authService: AuthService,
    private firestoreDocumentService: FirestoreDocumentService
  ) {}

  resolve(): Observable<UserDetails | null> {
    if (this.authService.user && this.authService.user.details) {
      return of(this.authService.user.details);
    }
    if (this.authService.user) {
      this.firestoreDocumentService
        .getUserDetails$(this.authService.user.auth.uid)
        .pipe(untilDestroyed(this));
    }

    return of(null);
  }
}
