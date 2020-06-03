import { Entity } from "..";

export interface ClassDictEntry extends Entity {
  classNo: number;
  subclass: string;
  studentCount: number;
}
