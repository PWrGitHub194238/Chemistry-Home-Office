import { HomeworkFile } from "functions/src/models/homework-file.model";

export interface SentHomework {
  uid: string;
  path_uid: string;
  email: string;
  files: HomeworkFile[];
}
