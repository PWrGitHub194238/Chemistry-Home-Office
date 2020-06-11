import { HomeworkPath, SentHomeworkFile } from ".";
import { Entity, UserDetails } from "../core/models";

export interface SentHomework extends Entity {
  email: string;
  displayName: string;
  userDetails: UserDetails;
  files: SentHomeworkFile[];
  date: Date;
  homeworkPath: HomeworkPath;
}
