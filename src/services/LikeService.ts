import { log } from "console";
import db from "../libs/db";
import { ILikeModels } from "../models/LikeModel";

export const like = async (like: ILikeModels) => {
  console.log("masuk likeService");
  console.log("data like nya: ");
  console.log(like);

  //cek udah di like atau belum
  const isLike = await db.likes.findFirst({
    where: {
      AND: [{ postId: like.postId }, { userId: like.userId }],
    },
    include: {
      post: true,
      user: true,
    },
  });

  //Ini kalo belum di like jadi like
  if (!isLike) {
    const handleLike = await db.likes.create({ data: like });
    return handleLike;
  }

  //ini kalo udah di like, jadi unlike
  const handleLike = await db.likes.delete({
    where: {
      id: isLike.id,
    },
  });

  return handleLike;
};

export const checkLike = async (like: ILikeModels) => {
  //cek like or unlike
  const existedLike = await db.likes.findFirst({
    where: {
      AND: [{ postId: like.postId }, { userId: like.userId }],
    },
  });

  let isLike = true;
  if (!existedLike) {
    isLike = false;
  }

  console.log(isLike);

  return isLike;
};

export const countLike = async (like: ILikeModels) => {
  //cek like or unlike
  const existedLike = await db.likes.count({
    where: {
      postId: like.postId,
    },
  });

  return existedLike;
};
