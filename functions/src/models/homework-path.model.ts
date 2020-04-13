import { Assignment } from "./assignment.model";

export interface HomeworkPath {
  uid: string;
  active: boolean;
  date: Date;
  subject: string;
  classNo: number;
  topic: string;
  assignments: Assignment[];
}
