import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeworkPathAuthGuard } from "src/app/core/guards/homework-path-auth.guard";
import { IsHomeworkPathActiveGuard } from "src/app/core/guards/is-homework-path-active.guard";
import { LoginGuard } from "src/app/core/guards/login.guard";
import { HomeworkPathResolver } from "src/app/core/resolvers/homework-path.resolver";
import { UserDetailsResolver } from "src/app/core/resolvers/user-details.resolver";
import { LessonNotFoundComponent } from "./components/lesson-not-found/lesson-not-found.component";
import { SendHomeworkComponent } from "./components/send-homework/send-homework.component";

const routes: Routes = [
  {
    path: "lesson-not-found",
    canActivate: [LoginGuard],
    component: LessonNotFoundComponent,
    resolve: {
      userDetails: UserDetailsResolver
    }
  },
  {
    path: ":uid",
    component: SendHomeworkComponent,
    canActivate: [LoginGuard, HomeworkPathAuthGuard, IsHomeworkPathActiveGuard],
    resolve: {
      homeworkPath: HomeworkPathResolver,
      userDetails: UserDetailsResolver
    }
  },
  {
    path: "**",
    redirectTo: "lesson-not-found"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendHomeworkRoutingModule {}
