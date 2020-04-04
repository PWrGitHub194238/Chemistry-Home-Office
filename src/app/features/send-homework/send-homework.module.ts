import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebcamModule } from "ngx-webcam";
import { MaterialDesignModule } from "src/app/material-design.module";
import { PublicModule } from "src/app/public/public.module";
import { FinishUploadBottomSheetComponent } from "./components/finish-upload-bottom-sheet/finish-upload-bottom-sheet.component";
import { LessonNotFoundComponent } from "./components/lesson-not-found/lesson-not-found.component";
import { SelectSendTypeBottomSheetComponent } from "./components/select-send-type-bottom-sheet/select-send-type-bottom-sheet.component";
import { SendHomeworkComponent } from "./components/send-homework/send-homework.component";
import { UploadFromCameraComponent } from "./components/upload-from-camera/upload-from-camera.component";
import { UploadFromDiskComponent } from "./components/upload-from-disk/upload-from-disk.component";
import { SendHomeworkRoutingModule } from "./send-homework-routing.module";
import { AddCommentForUploadDialogComponent } from "./components/add-comment-for-upload-dialog/add-comment-for-upload-dialog.component";

@NgModule({
  declarations: [
    SendHomeworkComponent,
    SelectSendTypeBottomSheetComponent,
    UploadFromCameraComponent,
    UploadFromDiskComponent,
    FinishUploadBottomSheetComponent,
    LessonNotFoundComponent,
    AddCommentForUploadDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    MaterialDesignModule,
    FlexLayoutModule,
    WebcamModule,
    SendHomeworkRoutingModule
  ],
  entryComponents: [
    SelectSendTypeBottomSheetComponent,
    FinishUploadBottomSheetComponent,
    AddCommentForUploadDialogComponent
  ]
})
export class SendHomeworkModule {}
