import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { RedirectToLoginState } from "../actions/redirect-to-login-state.action";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated) {
      this.authService.redirectToLogin(state.url, null);
      return false;
    } else if (!this.authService.isVerified) {
      const payload = {};
      payload[RedirectToLoginState.AccountNeedToBeVerified] = true;
      this.authService.redirectToLogin(state.url, payload);
    }

    return true;
  }
}
