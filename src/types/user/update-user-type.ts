import { Role } from "../enum/role";

export type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}