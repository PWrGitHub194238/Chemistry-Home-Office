import { Entity } from "..";

export interface UserDetails extends Entity {
  studentClass: string;
  studentNo: number;
}
