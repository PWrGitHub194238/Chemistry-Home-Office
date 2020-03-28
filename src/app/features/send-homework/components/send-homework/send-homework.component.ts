import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { LogoutStateAction } from "src/app/core/actions/logout-state.action";
import { AuthService } from "src/app/core/auth.service";
import { BlobUploadService } from "src/app/core/blob-upload.service";
import { EmailSenderService } from "src/app/core/email-sender.service";
import { HomeworkUploadService } from "src/app/core/homework-upload.service";
import { FirestorageUploadStatus } from "src/app/core/models/firestorage-upload-status";
import { SpinnerService } from "src/app/core/spinner.service";
import { HomeworkPath } from "src/app/models/homework-path.model";
import { SentHomework } from "src/app/models/sent-homework.model";
import { SpinnerMessage } from "../../../../core/spinner-message.consts";
import { FinishUploadBottomSheetAction } from "../finish-upload-bottom-sheet/finish-upload-bottom-sheet.action";
import { FinishUploadBottomSheetComponent } from "../finish-upload-bottom-sheet/finish-upload-bottom-sheet.component";
import { SelectSendTypeBottomSheetAction } from "../select-send-type-bottom-sheet/select-send-type-bottom-sheet.action";
import { SelectSendTypeBottomSheetComponent } from "../select-send-type-bottom-sheet/select-send-type-bottom-sheet.component";
import { UserDetails } from "src/app/core/models/user-details.model";
import { UpdateUserDetailsBottomSheetComponent } from "../update-user-details-bottom-sheet/update-user-details-bottom-sheet.component";
import { SelectSendTypeBottomSheetPayload } from "../select-send-type-bottom-sheet/select-send-type-bottom-sheet.payload";

@UntilDestroy()
@Component({
  selector: "cho-send-homework",
  templateUrl: "./send-homework.component.html",
  styleUrls: ["./send-homework.component.scss"]
})
export class SendHomeworkComponent implements OnInit {
  homeworkPath: HomeworkPath;
  isFinishUploadBottomSheetOpen: boolean = false;
  isSelectSendTypeBottomSheetOpen: boolean = true;
  attachementSourceTypeSelected: SelectSendTypeBottomSheetAction;
  selectedTypeOfAassignment: string;
  sentHomework: SentHomework;
  fileArray: string[] = [];
  isSending: boolean;

  SelectSendTypeBottomSheetAction = SelectSendTypeBottomSheetAction;

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  get isUserWithDetails(): boolean {
    return !!this.authService.userDetails;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private blobUploadService: BlobUploadService,
    private homeworkUploadService: HomeworkUploadService,
    private emailSenderService: EmailSenderService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.loadResolvedData();

    if (this.homeworkPath) {
      this.attachementSourceTypeSelected =
        SelectSendTypeBottomSheetAction.SelectSource;
      this.spinnerService.showSpinner(SpinnerMessage.SourceSelection);

      if (this.authService.userDetails) {
        this.openSelectAttachmentSourceDialog();
      } else {
        this.openUpdateUserDetailsDialog();
      }

      this.blobUploadService.blobUploaded$
        .pipe(untilDestroyed(this))
        .subscribe((uploadStatus: FirestorageUploadStatus) => {
          this.spinnerService.showSpinner(
            SpinnerMessage.SendingHomeworkAttachments,
            {
              sendingFileNo: uploadStatus.sentFileCount,
              totalFilesToSend: uploadStatus.totalFileCount
            }
          );
          if (uploadStatus.uploadFinish) {
            this.homeworkUploadService.storeHomework(
              this.homeworkPath,
              uploadStatus
            );
          }
        });

      this.homeworkUploadService.homeworkUploaded$
        .pipe(untilDestroyed(this))
        .subscribe((sentHomework: SentHomework) => {
          this.emailSenderService.sendNewHomework(sentHomework);
        });

      this.emailSenderService.emailSent$
        .pipe(untilDestroyed(this))
        .subscribe((resp: any) => {
          if (resp["error"]) {
            // TODO
          } else {
            this.isSending = false;
            const state = {};
            state[LogoutStateAction.SentHomeworkSuccess] = <HomeworkPath>resp;
            this.authService.logout(state);
          }
        });
    } else {
      this.router.navigate(["send-homework", "lesson-not-found"]);
    }
  }

  loadResolvedData() {
    this.homeworkPath = this.route.snapshot.data["homeworkPath"];
  }

  onSaveBlob(data: Blob) {
    this.blobUploadService.addHomeworkAttachment(
      this.homeworkPath,
      this.selectedTypeOfAassignment,
      data
    );
    this.openSelectNextActionDialog();
  }

  sendHomework() {
    this.isSending = true;
    this.spinnerService.showSpinner(SpinnerMessage.SendingHomework);
    this.blobUploadService.upload();
  }

  openSelectNextActionDialog() {
    const bottomSheetRef = this.bottomSheet.open(
      FinishUploadBottomSheetComponent,
      {
        disableClose: true
      }
    );

    bottomSheetRef
      .afterOpened()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isFinishUploadBottomSheetOpen = true;
        this.spinnerService.showSpinner(SpinnerMessage.UserNextActionSelect);
      });

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe((result: FinishUploadBottomSheetAction) => {
        this.isFinishUploadBottomSheetOpen = false;
        this.spinnerService.hideSpinner();
        switch (result) {
          default:
          case FinishUploadBottomSheetAction.Continue:
            return;
          case FinishUploadBottomSheetAction.SendHomework:
            this.sendHomework();
            return;
        }
      });
  }

  openSelectAttachmentSourceDialog() {
    let bottomSheetRef = this.bottomSheet.open(
      SelectSendTypeBottomSheetComponent,
      {
        disableClose: true,
        data: {
          homeworkPath: this.homeworkPath,
          assignment: this.selectedTypeOfAassignment
        }
      }
    );

    bottomSheetRef
      .afterOpened()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.attachementSourceTypeSelected =
          SelectSendTypeBottomSheetAction.SelectSource;
        this.isSelectSendTypeBottomSheetOpen = true;
      });

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe((result: SelectSendTypeBottomSheetPayload) => {
        this.isSelectSendTypeBottomSheetOpen = false;
        this.attachementSourceTypeSelected = result.action;
        switch (result.action) {
          case SelectSendTypeBottomSheetAction.LoadFromCamera:
            this.selectedTypeOfAassignment = result.assignment;
            this.spinnerService.hideSpinner();
            return;
          case SelectSendTypeBottomSheetAction.LoadFromDisk:
            this.selectedTypeOfAassignment = result.assignment;
            this.spinnerService.hideSpinner();
            return;
          case SelectSendTypeBottomSheetAction.SendHomework:
            this.sendHomework();
            return;
          default:
            break;
        }
      });
  }

  openUpdateUserDetailsDialog() {
    let bottomSheetRef = this.bottomSheet.open(
      UpdateUserDetailsBottomSheetComponent,
      {
        disableClose: true
      }
    );

    bottomSheetRef
      .afterDismissed()
      .pipe(untilDestroyed(this))
      .subscribe((result: UserDetails) => {
        this.authService.userDetails = result;
        this.openSelectAttachmentSourceDialog();
      });
  }
}
