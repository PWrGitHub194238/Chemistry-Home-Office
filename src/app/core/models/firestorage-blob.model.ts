import { SentHomeworkFile } from "src/app/models";

export interface FirestorageBlob {
  sentHomeworkFileMetadata: SentHomeworkFile;
  data: Blob;
}
