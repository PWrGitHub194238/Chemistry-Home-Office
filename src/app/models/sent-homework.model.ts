import { SentHomeworkFile } from ".";
import { Entity } from "../core/models";

export interface SentHomework extends Entity {
  path_uid: string;
  subject: string;
  topic: string;
  email: string;
  displayName: string;
  files: SentHomeworkFile[];
}
