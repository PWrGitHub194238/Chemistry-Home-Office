import { UserDetails } from "./user-details.model";
import { UserRoles } from "./user-roles.model";

export interface User {
  auth: firebase.User;
  details: UserDetails;
  roles: UserRoles;
}
