import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { SentHomework } from "../models/sent-homework.model";
import { HomeworkPath } from "../models/homework-path.model";
import { FirestorageUploadStatus } from "./models/firestorage-upload-status";
import { AuthService } from "./auth.service";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HomeworkUploadService {
  private homeworkUploadedSubject$: Subject<SentHomework>;
  homeworkUploaded$: Observable<SentHomework>;

  constructor(
    private authService: AuthService,
    private fireStoreService: AngularFirestore
  ) {
    this.homeworkUploadedSubject$ = new Subject<SentHomework>();
    this.homeworkUploaded$ = this.homeworkUploadedSubject$.asObservable();
  }

  storeHomework(
    homeworkPath: HomeworkPath,
    firestorageUploadStatus: FirestorageUploadStatus
  ) {
    const documentId = this.fireStoreService.createId();
    const sentHomeworkCollection = this.fireStoreService.collection<
      SentHomework
    >("/sent-homeworks");
    const sentHomework: SentHomework = {
      uid: documentId,
      path_uid: homeworkPath.uid,
      email: this.authService.user.email,
      files: firestorageUploadStatus.uploadedFiles.map(uploadTaskSnapshot => ({
        fullPath: uploadTaskSnapshot.snapshot.ref.fullPath,
        assignment: uploadTaskSnapshot.assignment
      }))
    };
    sentHomeworkCollection
      .doc(documentId)
      .set({ ...sentHomework })
      .then(() => this.homeworkUploadedSubject$.next(sentHomework));
  }
}
