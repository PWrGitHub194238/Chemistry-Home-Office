import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeworkPathResolver } from "src/app/core/homework-path.resolver";
import { UserDetailsResolver } from "src/app/core/user-details.resolver";
import { LoginGuard } from "src/app/login.guard";
import { LessonNotFoundComponent } from "./components/lesson-not-found/lesson-not-found.component";
import { SendHomeworkComponent } from "./components/send-homework/send-homework.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "lesson-not-found"
  },
  {
    path: "lesson-not-found",
    component: LessonNotFoundComponent,
    canActivate: [LoginGuard],
    resolve: {
      userDetails: UserDetailsResolver
    }
  },
  {
    path: ":uid",
    component: SendHomeworkComponent,
    canActivate: [LoginGuard],
    resolve: {
      homeworkPath: HomeworkPathResolver,
      userDetails: UserDetailsResolver
    }
  },
  {
    path: "**",
    component: LessonNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendHomeworkRoutingModule {}
