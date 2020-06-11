import { Entity } from "../entity.model";

export interface UserRoles extends Entity {
  admin?: boolean;
  student?: boolean;
}
