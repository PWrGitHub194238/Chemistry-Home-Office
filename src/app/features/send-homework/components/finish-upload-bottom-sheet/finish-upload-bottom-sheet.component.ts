import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { FinishUploadBottomSheetAction } from "./finish-upload-bottom-sheet.action";
import { BlobUploadService } from "src/app/core/blob-upload.service";

@Component({
  selector: "cho-finish-upload-bottom-sheet",
  templateUrl: "./finish-upload-bottom-sheet.component.html",
  styleUrls: ["./finish-upload-bottom-sheet.component.scss"]
})
export class FinishUploadBottomSheetComponent {
  get attachementCount(): number {
    return this.blobUploadService.attachementCount;
  }

  constructor(
    private blobUploadService: BlobUploadService,
    private bottomSheetRef: MatBottomSheetRef<FinishUploadBottomSheetComponent>
  ) {}

  onContinue() {
    this.bottomSheetRef.dismiss(FinishUploadBottomSheetAction.Continue);
  }

  onSendHomework() {
    this.bottomSheetRef.dismiss(FinishUploadBottomSheetAction.SendHomework);
  }
}
