import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import * as likeService from "../services/LikeService";

export const like = async (req: Request, res: Response) => {
  try {
    //ambil userId dari user
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.post_id);

    req.body.userId = res.locals.user.id;
    req.body.postId = parseInt(req.params.post_id);
    const post = await likeService.like(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkLike = async (req: Request, res: Response) => {
  try {
    //ambil userId dari user
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.post_id);

    req.body.userId = userId;
    req.body.postId = postId;

    const post = await likeService.checkLike(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const countLike = async (req: Request, res: Response) => {
  try {
    //ambil userId dari user
    const postId = parseInt(req.params.post_id);

    req.body.postId = postId;

    const post = await likeService.countLike(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
