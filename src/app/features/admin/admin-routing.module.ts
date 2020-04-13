import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";
import { AssignmentDictResolver } from "src/app/core/resolvers/assignment-dict.resolver";
import { MatIconDictResolver } from "src/app/core/resolvers/mat-icon-dict.resolver";

const routes: Routes = [
  {
    path: "homework-paths",
    component: HomeworkPathsComponent,
    resolve: {
      assignmentDict: AssignmentDictResolver,
      matIconDict: MatIconDictResolver
    }
  },
  {
    path: "**",
    redirectTo: "homework-paths"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
