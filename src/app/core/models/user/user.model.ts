import { UserDetailsDictEntry } from "./user-details-dict-entry.model";
import { UserRolesDictEntry } from "./user-roles-dict-entry.model";

export interface User {
  auth: firebase.User;
  details: UserDetailsDictEntry;
  roles: UserRolesDictEntry;
}
