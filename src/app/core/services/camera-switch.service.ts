import { Injectable } from "@angular/core";
import { WebcamUtil } from "ngx-webcam";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CameraSwitchService {
  private mediaDevicesSubject$: ReplaySubject<MediaDeviceInfo[]>;
  private switchCameraSubject$: ReplaySubject<boolean | string>;

  mediaDevices$: Observable<MediaDeviceInfo[]>;
  switchCamera$: Observable<boolean | string>;

  constructor() {
    this.mediaDevicesSubject$ = new ReplaySubject<MediaDeviceInfo[]>();
    this.mediaDevices$ = this.mediaDevicesSubject$.asObservable();
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.mediaDevicesSubject$.next(mediaDevices);
      }
    );

    this.switchCameraSubject$ = new ReplaySubject<boolean | string>();
    this.switchCamera$ = this.switchCameraSubject$.asObservable();
  }

  switchCamera(devideId: string) {
    this.switchCameraSubject$.next(devideId);
  }
}
