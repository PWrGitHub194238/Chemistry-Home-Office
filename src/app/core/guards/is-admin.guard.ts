import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { RedirectToLoginState } from "../actions/redirect-to-login-state.action";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class IsAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAdmin) {
      const quardPayload = {};
      quardPayload[RedirectToLoginState.NoAdminRole] = true;
      this.authService.redirectToLogin(state.url, quardPayload);
      return false;
    }

    return true;
  }
}
