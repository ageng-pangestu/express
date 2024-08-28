import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";
import { IPosts } from "../types/post";

const posts: PostModels[] = [];

export const findAll = async () => {
  return await db.posts.findMany({
    where: {
      parentId: null,
    },
    // join table
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          userName: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
    orderBy: {
      createdAt: `desc`,
    },
  });
};

export const findAllByUser = async (user_id: number) => {
  return await db.posts.findMany({
    where: {
      parentId: null,
      userId: user_id,
    },
    // join table
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          userName: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
    orderBy: {
      createdAt: `desc`,
    },
  });
};

export const findById = async (post_id: number) => {
  return await db.posts.findFirst({
    where: { id: post_id },
    // join table
    include: {
      author: {
        select: {
          id: true,
          userName: true,
          fullName: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
  });
};

//parameter dari model
export const create = async (post: PostModels) => {
  console.log("Masuk post sercive");
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
