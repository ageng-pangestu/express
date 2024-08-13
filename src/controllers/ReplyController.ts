import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/ReplyService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAllPost = async (req: Request, res: Response) => {
  const posts = await replyService.findAll();
  res.json(posts);
};

export const findByIdPost = async (req: Request, res: Response) => {
  const post = await replyService.findById(parseInt(req.params.id));
  res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  try {
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

export const updatePost = async (req: Request, res: Response) => {
  const post = await replyService.update(parseInt(req.params.id), req.body);

  console.log(post);

  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const post = await replyService.deletePost(parseInt(req.params.id));
  res.json(post);
};
