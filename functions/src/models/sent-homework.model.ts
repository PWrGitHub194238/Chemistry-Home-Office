import { Entity } from "./entity.model";
import { HomeworkPath } from "./homework-path.model";
import { SentHomeworkFile } from "./sent-homework-file.model";
import { UserDetails } from "./user/user-details.model";

export interface SentHomework extends Entity {
  email: string;
  displayName: string;
  userDetails: UserDetails;
  files: SentHomeworkFile[];
  date: Date;
  homeworkPath: HomeworkPath;
}
