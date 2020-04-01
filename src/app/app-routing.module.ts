import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsAdminGuard } from "./core/guards/is-admin.guard";
import { IsStudentGuard } from "./core/guards/is-student.guard";
import { LoginGuard } from "./core/guards/login.guard";
import { LoginComponent } from "./public/login/login.component";
import { RegisterComponent } from "./public/register/register.component";

const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./features/admin/admin.module").then(m => m.AdminModule),
    canActivate: [LoginGuard, IsAdminGuard]
  },
  {
    path: "send-homework",
    loadChildren: () =>
      import("./features/send-homework/send-homework.module").then(
        m => m.SendHomeworkModule
      ),
    canActivate: [LoginGuard, IsStudentGuard]
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
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
