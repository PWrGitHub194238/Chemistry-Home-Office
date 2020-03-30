import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RedirectToLoginState } from "../actions/redirect-to-login-state.action";

@Injectable({
  providedIn: "root"
})
export class IsStudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isStudent) {
      const quardPayload = {};
      quardPayload[RedirectToLoginState.NoStudentRole] = true;
      this.authService.redirectToLogin(state.url, quardPayload);
      return false;
    }

    return true;
  }
}
