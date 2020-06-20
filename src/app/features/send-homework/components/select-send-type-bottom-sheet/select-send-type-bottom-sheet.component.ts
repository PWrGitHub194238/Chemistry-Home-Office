import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material/bottom-sheet";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { BlobUploadService } from "src/app/core/services/blob-upload.service";
import { CameraSwitchService } from "src/app/core/services/camera-switch.service";
import { HomeworkPath } from "src/app/models";
import { SelectSendTypeBottomSheetAction } from "./select-send-type-bottom-sheet.action";

@Component({
  selector: "cho-select-send-type-bottom-sheet",
  templateUrl: "./select-send-type-bottom-sheet.component.html",
  styleUrls: ["./select-send-type-bottom-sheet.component.scss"]
})
export class SelectSendTypeBottomSheetComponent implements OnInit {
  assignmentForm: FormGroup;

  get assignmentControl(): FormControl {
    return this.assignmentForm.get("assignmentControl") as FormControl;
  }

  get homeworkPath() {
    return this.data.homeworkPath;
  }

  get mediaDevices$(): Observable<MediaDeviceInfo[]> {
    return this.cameraSwitchService.mediaDevices$;
  }

  get attachementCount(): number {
    return this.blobUploadService.attachementCount;
  }

  get class() {
    return this.authService.user.details.studentClass;
  }

  get assignments() {
    return this.homeworkPath.assignments.map(assignment => assignment.name);
  }

  constructor(
    private formBuilder: FormBuilder,
    private cameraSwitchService: CameraSwitchService,
    private blobUploadService: BlobUploadService,
    private authService: AuthService,
    private bottomSheetRef: MatBottomSheetRef<
      SelectSendTypeBottomSheetComponent
    >,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: {
      homeworkPath: HomeworkPath;
      assignment: string;
    }
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.assignmentForm = this.formBuilder.group({
      assignmentControl: [this.data.assignment, Validators.required]
    });
  }

  onCameraButtonClick(selectedDevice: MediaDeviceInfo) {
    this.cameraSwitchService.switchCamera(selectedDevice.deviceId);
    this.bottomSheetRef.dismiss({
      action: SelectSendTypeBottomSheetAction.LoadFromCamera,
      assignment: this.assignmentControl.value
    });
  }

  onLoadFromDiskClick() {
    this.bottomSheetRef.dismiss({
      action: SelectSendTypeBottomSheetAction.LoadFromDisk,
      assignment: this.assignmentControl.value
    });
  }

  onSendHomework() {
    this.bottomSheetRef.dismiss(SelectSendTypeBottomSheetAction.SendHomework);
    this.bottomSheetRef.dismiss({
      action: SelectSendTypeBottomSheetAction.SendHomework
    });
  }
}
