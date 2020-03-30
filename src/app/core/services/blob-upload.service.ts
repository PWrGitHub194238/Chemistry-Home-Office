import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { UUID } from "angular2-uuid";
import * as mime from "mime";
import { Observable, Subject } from "rxjs";
import { HomeworkPath } from "src/app/models";
import {
  FirestorageBlob,
  FirestorageHomeworkFile,
  FirestorageUploadStatus
} from "../models";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class BlobUploadService {
  private blobUploadedSubject$: Subject<FirestorageUploadStatus>;
  private blobMetadataQueue: FirestorageBlob[] = [];

  blobUploaded$: Observable<FirestorageUploadStatus>;

  get attachementCount(): number {
    return this.blobMetadataQueue.length;
  }

  constructor(
    private authService: AuthService,
    private fireStorageService: AngularFireStorage
  ) {
    this.blobUploadedSubject$ = new Subject<FirestorageUploadStatus>();
    this.blobUploaded$ = this.blobUploadedSubject$.asObservable();
  }

  addBlobToSend(fullPath: string, assignment: string, data: Blob) {
    this.blobMetadataQueue.push({
      fullPath,
      assignment,
      data
    });
  }

  addHomeworkAttachment(
    homeworkPath: HomeworkPath,
    assignment: string,
    data: Blob | File
  ) {
    const fileExtension = this.getFileExtension(data);
    const fullPath = `${homeworkPath.subject}/${
      this.authService.user.details.studentClass
    }/${homeworkPath.topic}/${assignment}/${
      this.authService.user.details.studentNo
    }/${UUID.UUID()}.${fileExtension}`;

    this.addBlobToSend(fullPath, assignment, data);
  }

  private getFileExtension(data: Blob | File): string {
    if (data && data instanceof File) {
      return data.name.split(".").pop();
    }

    if (data && data instanceof Blob) {
      return mime.getExtension(data.type);
    }

    return "";
  }

  upload() {
    const uploadedSnapshots: FirestorageHomeworkFile[] = [];
    const filesToUploadCount = this.attachementCount;

    let uploadedFilesCounter = 0;
    this.blobMetadataQueue.forEach(blobMeta => {
      this.fireStorageService
        .upload(blobMeta.fullPath, blobMeta.data)
        .then(uploadedTaskSnapshot => {
          uploadedFilesCounter += 1;
          uploadedSnapshots.push({
            snapshot: uploadedTaskSnapshot,
            assignment: blobMeta.assignment
          });
          this.blobUploadedSubject$.next({
            uploadFinish: uploadedFilesCounter === filesToUploadCount,
            sentFileCount: uploadedFilesCounter,
            totalFileCount: filesToUploadCount,
            uploadedFiles: uploadedSnapshots
          });
        });
    });

    this.blobMetadataQueue = [];
  }
}
