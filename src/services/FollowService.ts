import db from "../libs/db";
import { IFollowModels } from "../models/FollowModel";

export const follow = async (data: IFollowModels) => {
  const isFollow = await db.follow.findFirst({
    where: {
      AND: [{ userId: data.userId }, { followingId: data.followingId }],
    },
  });

  //Ini kalo belum di like jadi like
  if (!isFollow) {
    const handleFollow = await db.follow.create({ data: data });
    return handleFollow;
  }

  //ini kalo udah di like, jadi unlike
  const handleFollow = await db.follow.delete({
    where: {
      id: isFollow.id,
    },
  });

  return handleFollow;
};

export const checkFollow = async (follow: IFollowModels) => {
  //cek like or unlike
  const existedFollow = await db.follow.findFirst({
    where: {
      AND: [{ userId: follow.userId }, { followingId: follow.followingId }],
    },
  });

  console.log("ke follow ga:");

  let isFollow = true;
  if (!existedFollow) {
    isFollow = false;
    console.log("if nya masuk ga");
  }

  console.log(isFollow);
  return isFollow;
};
