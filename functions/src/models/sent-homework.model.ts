import { HomeworkFile } from "./homework-file.model";

export interface SentHomework {
  uid: string;
  path_uid: string;
  email: string;
  files: HomeworkFile[];
}
