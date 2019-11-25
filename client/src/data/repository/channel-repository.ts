import { ResponseEntity } from "./../http/api/response/ResponseEntity";
import { ChannelApi } from "../http/api/channel-api";
import { Channel } from "../../core/entity/channel";
import { ChannelRepositoryType } from "../../core/use-case/channel-repository-type";

export class ChannelRepository implements ChannelRepositoryType {
  private api: ChannelApi;

  constructor(api: ChannelApi) {
    this.api = api;
  }

  async create(channel: Channel): Promise<boolean> {
    try {
      const responseEntity = await this.api.create(channel);
      return !!responseEntity;
    } catch (error) {
      return false;
    }
  }

  async hasByName(channelName: string): Promise<boolean> {
    try {
      const responseEntity = await this.api.findByName(channelName);
      return !!responseEntity;
    } catch (error) {
      return false;
    }
  }

  async getChannels(): Promise<Channel[] | boolean> {
    try {
      const ResponseEntity = await this.api.getList();
      if (ResponseEntity)
        return (<ResponseEntity<Channel[]>>ResponseEntity).payload;
      return false;
    } catch (error) {
      return false;
    }
  }
}
