import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginGuard } from "./login.guard";
import { LoginComponent } from "./public/login/login.component";
import { PageNotFoundComponent } from "./public/page-not-found/page-not-found.component";
import { RegisterComponent } from "./public/register/register.component";

const routes: Routes = [
  {
    path: "send-homework",
    loadChildren: () =>
      import("./features/send-homework/send-homework.module").then(
        m => m.SendHomeworkModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "**",
    redirectTo: "send-homework"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
