import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebcamModule } from "ngx-webcam";
import { MaterialDesignModule } from "src/app/material-design.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AddCommentForUploadDialogComponent } from "./components/add-comment-for-upload-dialog/add-comment-for-upload-dialog.component";
import { FinishUploadBottomSheetComponent } from "./components/finish-upload-bottom-sheet/finish-upload-bottom-sheet.component";
import { LessonNotFoundComponent } from "./components/lesson-not-found/lesson-not-found.component";
import { SelectSendTypeBottomSheetComponent } from "./components/select-send-type-bottom-sheet/select-send-type-bottom-sheet.component";
import { SendHomeworkComponent } from "./components/send-homework/send-homework.component";
import { UploadFromCameraComponent } from "./components/upload-from-camera/upload-from-camera.component";
import { UploadFromDiskComponent } from "./components/upload-from-disk/upload-from-disk.component";
import { SendHomeworkRoutingModule } from "./send-homework-routing.module";
import { RootComponent } from "./components/root/root.component";

@NgModule({
  declarations: [
    SendHomeworkComponent,
    SelectSendTypeBottomSheetComponent,
    UploadFromCameraComponent,
    UploadFromDiskComponent,
    FinishUploadBottomSheetComponent,
    LessonNotFoundComponent,
    AddCommentForUploadDialogComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    FlexLayoutModule,
    WebcamModule,
    SharedModule,
    SendHomeworkRoutingModule
  ],
  entryComponents: [
    SelectSendTypeBottomSheetComponent,
    FinishUploadBottomSheetComponent,
    AddCommentForUploadDialogComponent
  ]
})
export class SendHomeworkModule {}
