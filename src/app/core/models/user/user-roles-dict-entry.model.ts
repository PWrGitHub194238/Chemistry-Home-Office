import { Entity } from "..";

export interface UserRolesDictEntry extends Entity {
  admin?: boolean;
  student?: boolean;
}
