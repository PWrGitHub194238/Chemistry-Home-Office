import { TaskStatus } from ".";
import { Entity } from "../core/models";

export interface SentHomeworkFile extends Entity {
  fileName: string;
  fullPath: string;
  description: string;
  assignment: string;
  status: TaskStatus;
}
