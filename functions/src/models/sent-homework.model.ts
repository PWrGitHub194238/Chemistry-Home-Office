import { Entity } from "./entity.model";
import { HomeworkPath } from "./homework-path.model";
import { SentHomeworkFile } from "./sent-homework-file.model";
import { UserDetailsDictEntry } from "./user/user-details-dict-entry.model";

export interface SentHomework extends Entity {
  email: string;
  displayName: string;
  userDetails: UserDetailsDictEntry;
  files: SentHomeworkFile[];
  date: Date;
  homeworkPath: HomeworkPath;
}
