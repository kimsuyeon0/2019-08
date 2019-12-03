import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { UserApi } from "data/http/api/user-api";
import { User } from "core/entity/user";
import { UserRepositoryType } from "core/use-case/user-repository-type";

export class UserRepository implements UserRepositoryType {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async create(user: User): Promise<boolean> {
    try {
      const responseEntity = await this.api.create(user);
      console.log(responseEntity);
      return !!responseEntity;
    } catch (error) {
      return false;
    }
  }
}