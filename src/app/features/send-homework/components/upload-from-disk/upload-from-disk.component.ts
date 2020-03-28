import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "cho-upload-from-disk",
  templateUrl: "./upload-from-disk.component.html",
  styleUrls: ["./upload-from-disk.component.scss"]
})
export class UploadFromDiskComponent {
  constructor() {}

  @Output() saveBlob = new EventEmitter<Blob>();

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      this.saveBlob.next(event[index]);
    }
  }
}
