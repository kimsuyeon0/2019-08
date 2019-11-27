import {Request, Response} from "express";
import {Post} from "../../entity/Post";
import {Paginator} from "./common/paginator";

/**
 *
 * channel id 에 해당하는 posts 조회
 *
 * @param request
 * @param response
 *
 * */
export const findByChannelId = async (request: Request, response: Response) => {
  const {id} = request.params;
  const pageable = new Paginator(request.query)
          .addOrder("id", request.query.order)
          .support();
  const posts = await Post.findByChannelId(id, pageable);
  return response
          .status(200)
          .json({message: "ok", payload: {posts: [...posts]}});
};