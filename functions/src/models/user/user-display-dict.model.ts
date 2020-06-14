import { Entity } from "../entity.model";
import { UserDetails } from "./user-details.model";
import { UserRoles } from "./user-roles.model";

export interface UserDisplayDict extends Entity {
  disabled: boolean;
  emailVerified: boolean;
  photoURL: string;
  displayName: string;
  details: UserDetails;
  roles: UserRoles;
}
