import { FirestorageHomeworkFile } from ".";

export interface FirestorageUploadStatus {
  uploadFinish: boolean;
  sentFileCount: number;
  totalFileCount: number;
  uploadedFiles: FirestorageHomeworkFile[];
}
