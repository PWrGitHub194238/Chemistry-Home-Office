import { Entity } from "../entity.model";

export interface UserDetailsDictEntry extends Entity {
  studentClass: string;
  studentNo: number;
}
