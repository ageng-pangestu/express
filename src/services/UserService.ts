import db from "../libs/db";

export const findAllUser = async (user_id: number) => {
  return await db.user.findMany({
    where: {
      NOT: { id: user_id },
    },
    select: {
      id: true,
      profile_pic: true,
      fullName: true,
      userName: true,
      email: true,
      bio: true,
    },
    take: 3,
  });
};

export const findUserById = async (user_id: number) => {
  return await db.user.findFirst({
    where: { id: user_id },
  });
};
