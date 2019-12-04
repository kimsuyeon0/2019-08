import { User } from "core/entity/user";
import { WebToken } from "core/entity/token";

export interface AuthRepositoryType {
  setToken(jwt: string): void;
  getUserInfo(): User;
  login(user: User): Promise<WebToken<string>>;
}