import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialDesignModule } from "src/app/material-design.module";
import { PublicModule } from "src/app/public/public.module";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { HomeworkPathDialogComponent } from "./components/homework-path-dialog/homework-path-dialog.component";

@NgModule({
  declarations: [HomeworkPathsComponent, HomeworkPathDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    MaterialDesignModule,
    FlexLayoutModule,
    AdminRoutingModule
  ],
  entryComponents: [HomeworkPathDialogComponent]
})
export class AdminModule {}
