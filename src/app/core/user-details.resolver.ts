import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, of } from "rxjs";
import { take, tap } from "rxjs/operators";
import { UserDetails } from "./models/user-details.model";
import { AuthService } from "./auth.service";

@UntilDestroy()
@Injectable({
  providedIn: "root"
})
export class UserDetailsResolver {
  constructor(
    private authService: AuthService,
    private fireStoreService: AngularFirestore
  ) {}

  resolve(): Observable<UserDetails | null> {
    if (this.authService.user) {
      const userDetailsCollection = this.fireStoreService.collection<
        UserDetails
      >("/user-details");

      return userDetailsCollection
        .doc<UserDetails>(this.authService.user.uid)
        .valueChanges()
        .pipe(
          take(1),
          untilDestroyed(this),
          tap(UserDetails => {
            this.authService.userDetails = UserDetails;
          })
        );
    }

    return of(null);
  }
}
