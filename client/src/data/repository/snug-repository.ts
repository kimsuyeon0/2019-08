import { ResponseEntity } from "./../http/api/response/ResponseEntity";
import { SnugApi } from "data/http/api/snug-api";
import { Snug } from "../../core/entity/snug";
import { SnugRepositoryType } from "../../core/use-case/snug-repository-type";

export class SnugRepository implements SnugRepositoryType {
  private api: SnugApi;

  constructor(api: SnugApi) {
    this.api = api;
  }

  async create(snug: Snug): Promise<Snug | boolean> {
    try {
      const responseEntity = await this.api.create(snug);
      if (typeof responseEntity === "boolean") return false;
      return (responseEntity as ResponseEntity<Snug>).payload;
    } catch (error) {
      return false;
    }
  }

  async getList(): Promise<Snug[] | boolean> {
    try {
      const responseEntity = await this.api.getList();
      return (responseEntity as ResponseEntity<Snug[]>).payload;
    } catch (error) {
      return false;
    }
  }
}
