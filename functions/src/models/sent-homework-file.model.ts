import { Entity } from "./entity.model";
import { TaskStatus } from "./task-status.model";

export interface SentHomeworkFile extends Entity {
  fileName: string;
  fullPath: string;
  description: string;
  assignment: string;
  status: TaskStatus;
}
