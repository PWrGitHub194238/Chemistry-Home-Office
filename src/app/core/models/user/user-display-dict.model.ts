import { Entity } from "..";
import { UserDetailsDictEntry } from "./user-details-dict-entry.model";
import { UserRolesDictEntry } from "./user-roles-dict-entry.model";

export interface UserDisplayDict extends Entity {
  disabled: boolean;
  emailVerified: boolean;
  photoURL: string;
  displayName: string;
  details: UserDetailsDictEntry;
  roles: UserRolesDictEntry;
}
