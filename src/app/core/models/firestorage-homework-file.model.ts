import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";

export interface FirestorageHomeworkFile {
  snapshot: UploadTaskSnapshot;
  assignment: string;
}
