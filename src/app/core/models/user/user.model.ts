import { UserDetailsDictEntry, UserRolesDictEntry } from ".";

export interface User {
  auth: firebase.User;
  details: UserDetailsDictEntry;
  roles: UserRolesDictEntry;
}
