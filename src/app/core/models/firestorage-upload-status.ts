import { FirestorageHomeworkFile } from "./firestorage-homework-file.model";

export interface FirestorageUploadStatus {
  uploadFinish: boolean;
  sentFileCount: number;
  totalFileCount: number;
  uploadedFiles: FirestorageHomeworkFile[];
}
