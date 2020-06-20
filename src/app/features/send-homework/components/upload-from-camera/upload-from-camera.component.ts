import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from "@angular/core";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { Observable, Subject } from "rxjs";
import { CameraSwitchService } from "src/app/core/services/camera-switch.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";

@Component({
  selector: "cho-upload-from-camera",
  templateUrl: "./upload-from-camera.component.html",
  styleUrls: ["./upload-from-camera.component.scss"]
})
export class UploadFromCameraComponent implements OnInit {
  public multipleWebcamsAvailable = false;
  private makeSnapshotSubject: Subject<void> = new Subject<void>();
  private snapshotSound: HTMLAudioElement;
  makeSnapshot$: Observable<void>;

  @Output() saveBlob = new EventEmitter<Blob>();
  width: number;
  height: number;
  contentType: string = "image/jpeg";

  get switchCamera$(): Observable<boolean | string> {
    return this.cameraSwitchService.switchCamera$;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }

  constructor(
    private cameraSwitchService: CameraSwitchService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.makeSnapshot$ = this.makeSnapshotSubject.asObservable();
    this.snapshotSound = new Audio();
    this.snapshotSound.src = "/assets/snapshot-sound.mp3";
    this.snapshotSound.load();
    this.onResize();
  }

  public takeSnapshot() {
    this.makeSnapshotSubject.next();
  }

  public onSnapshotCapture(webcamImage: WebcamImage) {
    this.snapshotSound.play();
    fetch(webcamImage.imageAsDataUrl)
      .then(res => res.blob())
      .then(blob => this.saveBlob.next(blob));
  }

  public handleInitError(error: WebcamInitError) {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === "NotAllowedError"
    ) {
      this.snackBarService.showCameraAccessDenied();
    }
  }
}
