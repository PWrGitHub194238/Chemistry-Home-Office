import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";

const routes: Routes = [
  {
    path: "homework-paths",
    component: HomeworkPathsComponent
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
