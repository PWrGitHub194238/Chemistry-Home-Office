import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { NgxImageGalleryModule } from "ngx-image-gallery";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MaterialDesignModule } from "src/app/material-design.module";
import { PublicModule } from "src/app/public/public.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AssignmentDictDialogComponent } from "./components/assignment-dict-dialog/assignment-dict-dialog.component";
import { AssignmentDictComponent } from "./components/assignment-dict/assignment-dict.component";
import { BasePanelComponent } from "./components/base-panel/base-panel.component";
import { ClassDictDialogComponent } from "./components/class-dict-dialog/class-dict-dialog.component";
import { ClassDictComponent } from "./components/class-dict/class-dict.component";
import { HomeworkPathsDialogComponent } from "./components/homework-paths-dialog/homework-paths-dialog.component";
import { HomeworkPathsComponent } from "./components/homework-paths/homework-paths.component";
import { MatIconDictComponent } from "./components/mat-icon-dict/mat-icon-dict.component";
import { RootComponent } from "./components/root/root.component";
import { SentHomeworksInnerFilesTableComponent } from "./components/sent-homeworks-inner-files-table/sent-homeworks-inner-files-table.component";
import { SentHomeworksInnerTableDialogComponent } from "./components/sent-homeworks-inner-table-dialog/sent-homeworks-inner-table-dialog.component";
import { SentHomeworksInnerTableComponent } from "./components/sent-homeworks-inner-table/sent-homeworks-inner-table.component";
import { SentHomeworksComponent } from "./components/sent-homeworks/sent-homeworks.component";
import { SubjectDictDialogComponent } from "./components/subject-dict-dialog/subject-dict-dialog.component";
import { SubjectDictComponent } from "./components/subject-dict/subject-dict.component";
import { UserDetailsDialogComponent } from "./components/user-details-dialog/user-details-dialog.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { SentHomeworkFilesGalleryComponent } from './components/sent-homework-files-gallery/sent-homework-files-gallery.component';
@NgModule({
  declarations: [
    HomeworkPathsComponent,
    HomeworkPathsDialogComponent,
    RootComponent,
    AssignmentDictComponent,
    ClassDictComponent,
    MatIconDictComponent,
    SentHomeworksComponent,
    SubjectDictComponent,
    UserDetailsComponent,
    UserDetailsDialogComponent,
    SubjectDictDialogComponent,
    ClassDictDialogComponent,
    AssignmentDictDialogComponent,
    SentHomeworksInnerTableComponent,
    SentHomeworksInnerTableDialogComponent,
    BasePanelComponent,
    SentHomeworksInnerFilesTableComponent,
    SentHomeworkFilesGalleryComponent
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
    ClipboardModule,
    NgxImageGalleryModule
  ],
  entryComponents: [HomeworkPathsDialogComponent]
})
export class AdminModule {}
