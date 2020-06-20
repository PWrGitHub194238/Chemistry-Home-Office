import { Entity, UserDetailsDictEntry, UserRolesDictEntry } from "..";

export interface UserDisplayDict extends Entity {
  disabled: boolean;
  emailVerified: boolean;
  photoURL: string;
  displayName: string;
  details: UserDetailsDictEntry;
  roles: UserRolesDictEntry;
}
