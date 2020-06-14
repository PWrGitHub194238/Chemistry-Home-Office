import { HomeworkPath, SentHomeworkFile } from ".";
import { Entity, UserDetailsDictEntry } from "../core/models";

export interface SentHomework extends Entity {
  email: string;
  displayName: string;
  userDetails: UserDetailsDictEntry;
  files: SentHomeworkFile[];
  date: Date;
  homeworkPath: HomeworkPath;
}
