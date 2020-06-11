import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UUID } from "angular2-uuid";
import { RedirectToLoginState } from "src/app/core/actions/redirect-to-login-state.action";
import { SubjectError, SubjectSuccess } from "src/app/core/models";
import { FirestorageUploadStatus } from "src/app/core/models/firestorage-upload-status";
import { AuthService } from "src/app/core/services/auth.service";
import { BlobUploadService } from "src/app/core/services/blob-upload.service";
import { EmailSenderService } from "src/app/core/services/email-sender.service";
import { HomeworkUploadService } from "src/app/core/services/homework-upload.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { SentHomeworkFile, TaskStatus } from "src/app/models";
import { HomeworkPath } from "src/app/models/homework-path.model";
import { SentHomework } from "src/app/models/sent-homework.model";
import { SpinnerMessage } from "../../../../core/spinner-message.consts";
import { AddCommentForUploadDialogComponent } from "../add-comment-for-upload-dialog/add-comment-for-upload-dialog.component";
import { FinishUploadBottomSheetAction } from "../finish-upload-bottom-sheet/finish-upload-bottom-sheet.action";
import { FinishUploadBottomSheetComponent } from "../finish-upload-bottom-sheet/finish-upload-bottom-sheet.component";
import { SelectSendTypeBottomSheetAction } from "../select-send-type-bottom-sheet/select-send-type-bottom-sheet.action";
import { SelectSendTypeBottomSheetComponent } from "../select-send-type-bottom-sheet/select-send-type-bottom-sheet.component";
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
  isAddCommentForUploadDialogOpen: boolean = false;
  attachementSourceTypeSelected: SelectSendTypeBottomSheetAction;
  sentHomework: SentHomework;
  isSending: boolean;
  nextHomeworkFileMetadataToSend: SentHomeworkFile;

  SelectSendTypeBottomSheetAction = SelectSendTypeBottomSheetAction;

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }

  get loadingMessage(): boolean {
    return this.spinnerService.loadingMessage;
  }

  get isUserWithDetails(): boolean {
    return !!this.authService.user.details;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private blobUploadService: BlobUploadService,
    private homeworkUploadService: HomeworkUploadService,
    private emailSenderService: EmailSenderService,
    private spinnerService: SpinnerService,
    private bottomSheet: MatBottomSheet,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadResolvedData();

    if (this.homeworkPath.uid) {
      this.attachementSourceTypeSelected =
        SelectSendTypeBottomSheetAction.SelectSource;
      this.spinnerService.showSpinner(SpinnerMessage.SourceSelection);

      this.resetNextHomeworkFileMetadata();

      this.openSelectAttachmentSourceDialog();

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
        .subscribe((resp: SubjectSuccess | SubjectError) => {
          const state = {};
          if (resp["error"]) {
            state[RedirectToLoginState.SentHomeworkFailed] =
              "Wysyłanie pracy nie powiodło się";
          } else {
            this.isSending = false;
            const state = {};
            state[RedirectToLoginState.SentHomeworkSuccess] = <HomeworkPath>(
              resp
            );
          }
          this.authService.logout(null, state);
        });
    } else {
      this.router.navigate(["send-homework", "lesson-not-found"]);
    }
  }

  loadResolvedData() {
    this.homeworkPath = this.route.snapshot.data["homeworkPath"];
  }

  resetNextHomeworkFileMetadata() {
    if (this.nextHomeworkFileMetadataToSend) {
      this.nextHomeworkFileMetadataToSend = {
        uid: "",
        fileName: this.blobUploadService.getNextSugestedFileName(
          this.nextHomeworkFileMetadataToSend.assignment
        ),
        fullPath: "",
        assignment: this.nextHomeworkFileMetadataToSend.assignment,
        description: "",
        status: TaskStatus.ToReview
      };
    } else {
      this.nextHomeworkFileMetadataToSend = {
        uid: "",
        fileName: "",
        fullPath: "",
        assignment: "",
        description: "",
        status: TaskStatus.ToReview
      };
    }
  }

  onSaveBlob(data: Blob) {
    this.nextHomeworkFileMetadataToSend.uid = UUID.UUID();
    this.nextHomeworkFileMetadataToSend.fullPath = this.blobUploadService.addHomeworkAttachment(
      this.homeworkPath,
      this.nextHomeworkFileMetadataToSend,
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
            this.resetNextHomeworkFileMetadata();
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
          assignment: this.nextHomeworkFileMetadataToSend.assignment
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
          case SelectSendTypeBottomSheetAction.LoadFromDisk:
            this.nextHomeworkFileMetadataToSend.assignment = result.assignment;
            this.resetNextHomeworkFileMetadata();
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

  openAddCommentForUploadDialog() {
    let matDialogRef = this.matDialog.open(AddCommentForUploadDialogComponent, {
      data: {
        homeworkPath: this.homeworkPath,
        homeworkFileMetadata: this.nextHomeworkFileMetadataToSend
      }
    });

    matDialogRef
      .afterOpened()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isAddCommentForUploadDialogOpen = true;
      });

    matDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: SentHomeworkFile | null) => {
        this.isAddCommentForUploadDialogOpen = false;
        if (result) {
          this.nextHomeworkFileMetadataToSend = result;
        }
      });
  }
}
