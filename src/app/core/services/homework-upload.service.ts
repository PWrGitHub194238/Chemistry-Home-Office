import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HomeworkPath, SentHomework, TaskStatus } from "src/app/models";
import { FirestorageUploadStatus } from "../models";
import { AuthService } from "../services/auth.service";
import { FirestoreDocumentService } from "../services/firestore-document.service";
import { RedirectToLoginState } from "../actions/redirect-to-login-state.action";

@Injectable({
  providedIn: "root"
})
export class HomeworkUploadService {
  private homeworkUploadedSubject$: Subject<SentHomework>;
  homeworkUploaded$: Observable<SentHomework>;

  constructor(
    private authService: AuthService,
    private firestoreDocumenrService: FirestoreDocumentService
  ) {
    this.homeworkUploadedSubject$ = new Subject<SentHomework>();
    this.homeworkUploaded$ = this.homeworkUploadedSubject$.asObservable();
  }

  async storeHomework(
    homeworkPath: HomeworkPath,
    firestorageUploadStatus: FirestorageUploadStatus
  ) {
    let sentHomework: SentHomework = {
      uid: "",
      email: this.authService.user.auth.email,
      displayName: this.authService.user.auth.displayName,
      userDetails: this.authService.user.details,
      files: firestorageUploadStatus.uploadedFiles.map(
        uploadTaskSnapshot => uploadTaskSnapshot.sentHomeworkFileMetadata
      ),
      date: new Date(),
      homeworkPath
    };

    // Add UID
    sentHomework = await this.firestoreDocumenrService.createSentHomework$(
      sentHomework
    );

    if (sentHomework) {
      this.homeworkUploadedSubject$.next(sentHomework);
    } else {
      const state = {};
      state[RedirectToLoginState.SentHomeworkFailed] =
        "Zapisywanie pracy przed wysłaniem nie powiodło się.";
      this.authService.logout(null, state);
    }
  }
}
