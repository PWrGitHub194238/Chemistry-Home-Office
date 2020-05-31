import { Entity } from "./entity.model";

export interface Class extends Entity {
  classNo: number;
  subclass: string;
  studentCount: number;
}
