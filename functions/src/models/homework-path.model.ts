import { AssignmentDictEntry } from "./dictionaries/assignment-dict-entry.model";
import { SubjectDictEntry } from "./dictionaries/subject-dict-entry.model";
import { Entity } from "./entity.model";

export interface HomeworkPath extends Entity {
  active: boolean;
  date: Date;
  subject: SubjectDictEntry;
  classNo: number;
  topic: string;
  assignments: AssignmentDictEntry[];
}
