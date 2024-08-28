import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import * as followService from "../services/FollowService";

export const follow = async (req: Request, res: Response) => {
  try {
    //ambil userId dari user
    const userId = res.locals.user.id;
    const followingId = parseInt(req.params.following_id);

    req.body.userId = userId;
    req.body.followingId = followingId;
    const post = await followService.follow(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkFollow = async (req: Request, res: Response) => {
  try {
    //ambil userId dari user
    const userId = res.locals.user.id;
    const followingId = parseInt(req.params.following_id);

    req.body.userId = userId;
    req.body.followingId = followingId;

    const follow = await followService.checkFollow(req.body);
    res.json(follow);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
