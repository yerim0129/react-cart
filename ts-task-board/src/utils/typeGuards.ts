import {IUser} from "../interfaces/IUser";
import {IAdmin} from "../interfaces/IAdmin";

export function isAdmin(user: IUser): user is IAdmin {
  return user.role === "ADMIN";
}
