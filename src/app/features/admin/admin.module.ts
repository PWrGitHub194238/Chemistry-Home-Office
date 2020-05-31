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
import { AssignmentDictDialogComponent } from "./components/assignment-dict-dialog/assignment-dict-dialog.component";
import { AssignmentDictComponent } from "./components/assignment-dict/assignment-dict.component";
import { BaseTablePanelComponent } from "./components/base-table-panel/base-table-panel.component";
import { ClassDictDialogComponent } from "./components/class-dict-dialog/class-dict-dialog.component";
import { ClassDictComponent } from "./components/class-dict/class-dict.component";
import { HomeworkPathDialogComponent } from "./components/homework-path-dialog/homework-path-dialog.component";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";
import { MatIconDictComponent } from "./components/mat-icon-dict/mat-icon-dict.component";
import { RootComponent } from "./components/root/root.component";
import { SentHomeworksDialogComponent } from "./components/sent-homeworks-dialog/sent-homeworks-dialog.component";
import { SentHomeworksComponent } from "./components/sent-homeworks/sent-homeworks.component";
import { SubjectDictDialogComponent } from "./components/subject-dict-dialog/subject-dict-dialog.component";
import { SubjectDictComponent } from "./components/subject-dict/subject-dict.component";
import { UserDetailsDialogComponent } from "./components/user-details-dialog/user-details-dialog.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

@NgModule({
  declarations: [
    HomeworkPathsComponent,
    HomeworkPathDialogComponent,
    RootComponent,
    AssignmentDictComponent,
    ClassDictComponent,
    MatIconDictComponent,
    SentHomeworksComponent,
    SubjectDictComponent,
    UserDetailsComponent,
    UserDetailsDialogComponent,
    SubjectDictDialogComponent,
    SentHomeworksDialogComponent,
    ClassDictDialogComponent,
    AssignmentDictDialogComponent,
    BaseTablePanelComponent
  ],
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
