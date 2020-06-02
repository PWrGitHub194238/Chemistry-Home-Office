import { Entity } from "./entity.model";

export interface Student extends Entity {
  email: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
  providerId: string;
  class: string;
  no: number;
  admin: boolean;
  student: boolean;
}
