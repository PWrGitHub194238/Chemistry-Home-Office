import { Entity } from "../entity.model";

export interface UserDetails extends Entity {
  studentClass: string;
  studentNo: number;
}
