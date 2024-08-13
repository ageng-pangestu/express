import { createPostSchema } from "../libs/validations/post";
import * as postService from "../services/PostService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAllPost = async (req: Request, res: Response) => {
  console.log("Masuk Controller");

  const posts = await postService.findAll();
  res.json(posts);
};

export const findByIdPost = async (req: Request, res: Response) => {
  const post = await postService.findById(parseInt(req.params.id));
  res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
  console.log("masuk createcontroller");

  try {
    await createPostSchema.validateAsync(req.body);

    if (req.file) {
      req.body.image = req.file.filename;
    }

    //ambil userId dari user
    const userId = res.locals.user.id;
    console.log("User id: " + userId);

    req.body.userId = userId;

    const post = await postService.create(req.body);
    res.json(post);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const post = await postService.update(parseInt(req.params.id), req.body);

  console.log(post);

  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const post = await postService.deletePost(parseInt(req.params.id));
  res.json(post);
};
