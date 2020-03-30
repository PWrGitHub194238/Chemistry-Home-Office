import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { BlobUploadService } from "src/app/core/services/blob-upload.service";
import { FinishUploadBottomSheetAction } from "./finish-upload-bottom-sheet.action";

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
