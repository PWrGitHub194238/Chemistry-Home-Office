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
import { RootComponent } from "./components/root/root.component";
import { AssignmentDictComponent } from './components/assignment-dict/assignment-dict.component';
import { ClassDictComponent } from './components/class-dict/class-dict.component';
import { MatIconsComponent } from './components/mat-icons/mat-icons.component';
import { SentHomeworksComponent } from './components/sent-homeworks/sent-homeworks.component';
import { SubjectDictComponent } from './components/subject-dict/subject-dict.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserDetailsDialogComponent } from './components/user-details-dialog/user-details-dialog.component';
import { SubjectDictDialogComponent } from './components/subject-dict-dialog/subject-dict-dialog.component';
import { SentHomeworksDialogComponent } from './components/sent-homeworks-dialog/sent-homeworks-dialog.component';
import { ClassDictDialogComponent } from './components/class-dict-dialog/class-dict-dialog.component';
import { AssignmentDictDialogComponent } from './components/assignment-dict-dialog/assignment-dict-dialog.component';

@NgModule({
  declarations: [
    HomeworkPathsComponent,
    HomeworkPathDialogComponent,
    RootComponent,
    AssignmentDictComponent,
    ClassDictComponent,
    MatIconsComponent,
    SentHomeworksComponent,
    SubjectDictComponent,
    UserDetailsComponent,
    UserDetailsDialogComponent,
    SubjectDictDialogComponent,
    SentHomeworksDialogComponent,
    ClassDictDialogComponent,
    AssignmentDictDialogComponent
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
