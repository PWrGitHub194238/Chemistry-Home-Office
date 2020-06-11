import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import * as mime from "mime";
import { Observable, Subject } from "rxjs";
import { HomeworkPath, SentHomeworkFile } from "src/app/models";
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

  getNextSugestedFileName(assignmentSelected: string): string {
    const assignmentBlobCounter = this.blobMetadataQueue.filter(
      (blob: FirestorageBlob) =>
        blob.sentHomeworkFileMetadata.assignment === assignmentSelected
    ).length;
    return `${assignmentSelected} ${assignmentBlobCounter + 1}`;
  }

  addBlobToSend(sentHomeworkFileMetadata: SentHomeworkFile, data: Blob) {
    this.blobMetadataQueue.push({
      sentHomeworkFileMetadata,
      data
    });
  }

  addHomeworkAttachment(
    homeworkPath: HomeworkPath,
    sentHomeworkFileMetadata: SentHomeworkFile,
    data: Blob | File
  ): string {
    const fileExtension = this.getFileExtension(data);

    sentHomeworkFileMetadata.fullPath = `${homeworkPath.subject}/${this.authService.user.details.studentClass}/${homeworkPath.topic}/${sentHomeworkFileMetadata.assignment}/${this.authService.user.details.studentNo}/${sentHomeworkFileMetadata.uid}.${fileExtension}`;

    this.addBlobToSend(sentHomeworkFileMetadata, data);

    return sentHomeworkFileMetadata.fullPath;
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
        .upload(blobMeta.sentHomeworkFileMetadata.fullPath, blobMeta.data)
        .then(uploadedTaskSnapshot => {
          uploadedFilesCounter += 1;
          uploadedSnapshots.push({
            snapshot: uploadedTaskSnapshot,
            sentHomeworkFileMetadata: blobMeta.sentHomeworkFileMetadata
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
