import { Entity } from "../entity.model";

export interface UserRolesDictEntry extends Entity {
  admin?: boolean;
  student?: boolean;
}
