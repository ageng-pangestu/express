import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";

const posts: PostModels[] = [];

export const findAll = async (post_id: number) => {
  return await db.posts.findMany({
    // join table
    where: {
      parentId: post_id,
    },
    include: {
      author: {
        select: {
          id: true,
          userName: true,
          profile_pic: true,
          email: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: `desc`,
    },
  });
};

export const countReply = async (post_id: number) => {
  const totalReply = await db.posts.count({
    // join table
    where: {
      parentId: post_id,
    },
  });
  return totalReply;
};

export const findById = async (post_id: number) => {
  return await db.posts.findFirst({
    where: {
      parentId: post_id,
    },
    // join table
    include: {
      author: {
        select: {
          id: true,
          userName: true,
          profile_pic: true,
        },
      },
      comments: true,
    },
  });
};

//parameter dari model
export const create = async (reply: Posts) => {
  const newPost = await db.posts.create({ data: reply });

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
