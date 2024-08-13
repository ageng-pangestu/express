import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";
import { IPosts } from "../types/post";

const posts: PostModels[] = [];

export const findAll = async () => {
  console.log("Masuk Service");
  return await db.posts.findMany({
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
  });
};

export const findById = async (id: number) => {
  return await db.posts.findFirst({
    where: { id },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
  });
};

//parameter dari model
export const create = async (post: PostModels) => {
  console.log("masuk createservice");
  const newPost = await db.posts.create({ data: post });

  return newPost;
};

export const update = async (id: number, post: PostModels) => {
  const updatePost = await db.posts.update({
    where: {
      id: id,
    },
    data: {
      content: post.content,
    },
  });

  return updatePost;
};

export const deletePost = async (id: number) => {
  const deletePost = await db.posts.delete({
    where: {
      id: id,
    },
  });

  return deletePost;
};
