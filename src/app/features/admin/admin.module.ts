import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MaterialDesignModule } from "src/app/material-design.module";
import { PublicModule } from "src/app/public/public.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { HomeworkPathDialogComponent } from "./components/homework-path-dialog/homework-path-dialog.component";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";

@NgModule({
  declarations: [HomeworkPathsComponent, HomeworkPathDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    SharedModule,
    MaterialDesignModule,
    FlexLayoutModule,
    AdminRoutingModule,
    NgScrollbarModule,
    ClipboardModule
  ],
  entryComponents: [HomeworkPathDialogComponent]
})
export class AdminModule {}
