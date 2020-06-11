import { Entity } from "..";

export interface UserRoles extends Entity {
  admin?: boolean;
  student?: boolean;
}
