import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "cho-upload-from-disk",
  templateUrl: "./upload-from-disk.component.html",
  styleUrls: ["./upload-from-disk.component.scss"]
})
export class UploadFromDiskComponent implements OnInit {
  @Output() saveBlob = new EventEmitter<Blob>();

  private snapshotSound: HTMLAudioElement;

  ngOnInit() {
    this.snapshotSound = new Audio();
    this.snapshotSound.src = "/assets/snapshot-sound.mp3";
    this.snapshotSound.load();
  }

  uploadFile(event: any) {
    this.snapshotSound.play();
    for (let index = 0; index < event.length; index++) {
      this.saveBlob.next(event[index]);
    }
  }
}
