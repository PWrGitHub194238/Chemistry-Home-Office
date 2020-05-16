import { Component } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "cho-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
