import { Entity } from "../entity.model";

export interface SubjectDictEntry extends Entity {
  name: string;
  teacherEmail: string;
}
