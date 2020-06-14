import { AssignmentDictEntry, Entity, SubjectDictEntry } from "../core/models";

export interface HomeworkPath extends Entity {
  active: boolean;
  date: Date;
  subject: SubjectDictEntry;
  classNo: number;
  topic: string;
  assignments: AssignmentDictEntry[];
}
