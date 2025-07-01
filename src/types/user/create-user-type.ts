import { Role } from "../enum/role";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  role?: Role; // Opcional pois tem default
}