import { Entity, SentHomeworkFile } from ".";

export interface SentHomework extends Entity {
  path_uid: string;
  subject: string;
  topic: string;
  email: string;
  displayName: string;
  files: SentHomeworkFile[];
}
