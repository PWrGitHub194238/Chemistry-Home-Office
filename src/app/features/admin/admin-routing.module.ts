import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssignmentDictResolver } from "src/app/core/resolvers/assignment-dict.resolver";
import { MatIconDictResolver } from "src/app/core/resolvers/mat-icon-dict.resolver";
import {
  adminChildAssignmentDictPath,
  adminChildClassDictPath,
  adminChildHomeworkPathsPath,
  adminChildMatIconsPath,
  adminChildSentHomeworksPath,
  adminChildSubjectDictPath,
  adminChildUserDetailsPath
} from "./admin-routing.const";
import { AssignmentDictComponent } from "./components/assignment-dict/assignment-dict.component";
import { ClassDictComponent } from "./components/class-dict/class-dict.component";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";
import { MatIconDictComponent } from "./components/mat-icon-dict/mat-icon-dict.component";
import { RootComponent } from "./components/root/root.component";
import { SentHomeworksComponent } from "./components/sent-homeworks/sent-homeworks.component";
import { SubjectDictComponent } from "./components/subject-dict/subject-dict.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { SubjecDictResolver } from "src/app/core/resolvers/subject-dict.resolver";

const routes: Routes = [
  {
    path: "",
    component: RootComponent,
    children: [
      {
        path: adminChildAssignmentDictPath,
        component: AssignmentDictComponent,
        resolve: {
          matIconDict: MatIconDictResolver
        },
        data: { animation: adminChildAssignmentDictPath }
      },
      {
        path: adminChildClassDictPath,
        component: ClassDictComponent,
        resolve: {},
        data: { animation: adminChildClassDictPath }
      },
      {
        path: adminChildMatIconsPath,
        component: MatIconDictComponent,
        resolve: {},
        data: { animation: adminChildMatIconsPath }
      },
      {
        path: adminChildHomeworkPathsPath,
        component: HomeworkPathsComponent,
        resolve: {
          assignmentDict: AssignmentDictResolver,
          matIconDict: MatIconDictResolver,
          subjectDict: SubjecDictResolver
        },
        data: { animation: adminChildHomeworkPathsPath }
      },
      {
        path: adminChildSentHomeworksPath,
        component: SentHomeworksComponent,
        resolve: {
          assignmentDict: AssignmentDictResolver,
          matIconDict: MatIconDictResolver
        },
        data: { animation: adminChildSentHomeworksPath }
      },
      {
        path: adminChildSubjectDictPath,
        component: SubjectDictComponent,
        resolve: {},
        data: { animation: adminChildSubjectDictPath }
      },
      {
        path: adminChildUserDetailsPath,
        component: UserDetailsComponent,
        resolve: {},
        data: { animation: adminChildUserDetailsPath }
      },
      {
        path: "**",
        redirectTo: adminChildHomeworkPathsPath
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
