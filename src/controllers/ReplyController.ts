import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/ReplyService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAllReply = async (req: Request, res: Response) => {
  const posts = await replyService.findAll(parseInt(req.params.post_id));
  res.json(posts);
};

export const countReply = async (req: Request, res: Response) => {
  const posts = await replyService.countReply(parseInt(req.params.post_id));
  res.json(posts);
};

export const findByIdReply = async (req: Request, res: Response) => {
  const post = await replyService.findById(parseInt(req.params.post_id));
  res.json(post);
};

export const createReply = async (req: Request, res: Response) => {
  try {
    console.log("masuk ReplyController");

    await createPostSchema.validateAsync(req.body);

    if (req.file) {
      req.body.image = req.file.filename;
    }

    const postId = parseInt(req.params.post_id);
    const userId = res.locals.user.id;
    req.body.userId = userId;
    req.body.parentId = postId;

    const post = await replyService.create(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const updateReply = async (req: Request, res: Response) => {
  const post = await replyService.update(parseInt(req.params.id), req.body);

  console.log(post);

  res.json(post);
};

export const deleteReply = async (req: Request, res: Response) => {
  const post = await replyService.deletePost(parseInt(req.params.id));
  res.json(post);
};
