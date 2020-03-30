import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HomeworkPath, SentHomework } from "src/app/models";
import { FirestorageUploadStatus } from "../models";
import { AuthService } from "../services/auth.service";
import { FirestoreDocumentService } from "../services/firestore-document.service";

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
    const sentHomework: SentHomework = this.firestoreDocumenrService.createSentHomework(
      {
        uid: "",
        path_uid: homeworkPath.uid,
        email: this.authService.user.auth.email,
        files: firestorageUploadStatus.uploadedFiles.map(
          uploadTaskSnapshot => ({
            fullPath: uploadTaskSnapshot.snapshot.ref.fullPath,
            assignment: uploadTaskSnapshot.assignment
          })
        )
      }
    );

    this.homeworkUploadedSubject$.next(sentHomework);
  }
}
