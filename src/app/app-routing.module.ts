import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsAdminGuard } from "./core/guards/is-admin.guard";
import { IsStudentGuard } from "./core/guards/is-student.guard";
import { LoginGuard } from "./core/guards/login.guard";
import { HomeComponent } from "./public/home/home.component";
import { LoginComponent } from "./public/login/login.component";
import { RegisterComponent } from "./public/register/register.component";
import { ResetPasswordComponent } from "./public/reset-password/reset-password.component";

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
    path: "faq",
    loadChildren: () => import("./faq/faq.module").then(m => m.FaqModule)
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
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
        path: "resetPassword",
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
