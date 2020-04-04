import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";
import { SentHomeworkFile } from "src/app/models";

export interface FirestorageHomeworkFile {
  snapshot: UploadTaskSnapshot;
  sentHomeworkFileMetadata: SentHomeworkFile;
}
