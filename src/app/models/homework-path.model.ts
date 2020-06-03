import { AssignmentDictEntry, Entity } from "../core/models";

export interface HomeworkPath extends Entity {
  active: boolean;
  date: Date;
  subject: string;
  classNo: number;
  topic: string;
  assignments: AssignmentDictEntry[];
}
