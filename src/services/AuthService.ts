import { User } from "@prisma/client";
import db from "../libs/db";
import { IUserRegister } from "../types/Auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ERROR from "../utils/constants/ERROR_LIST";

// export  async function loginn(username: string, password: string){
// const exist = await db.user.findFirst({
//   where: {
//     username: username
//   }
// })
// }

export const register = async (user: IUserRegister): Promise<User | string> => {
  //validasi ada usernamenya atau tidak
  const existedUser = await db.user.findFirst({
    where: {
      userName: user.userName,
    },
  });

  //kalau ada dia error
  if (existedUser) {
    throw new Error("Username already exist");
  }

  //   hash password agar aman
  const hashedPassword = await bcrypt.hash(user.password, 10);

  //inisialisasi ulang
  user.password = hashedPassword;

  //Create data baru
  const newUser = await db.user.create({ data: user });

  return newUser;
};

export const login = async (email: string, password: string) => {
  //validasi
  const existedUser = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { userName: email }],
    },
  });

  //cek ada usernamenya tidak
  if (!existedUser) {
    throw new Error(ERROR.AUTH_NOT_FOUND);
  }

  //cek password
  const isMatch = await bcrypt.compare(password, existedUser.password);

  if (!isMatch) {
    console.log("password error");
    throw new Error(ERROR.AUTH_NOT_FOUND);
  }

  //ini memngubah data yg masuk (existedUSer) menjadi token
  const token = jwt.sign(existedUser, process.env.SECRET_KEY! || "secret", {
    expiresIn: "1d",
  });

  return token;
};

export const update = async (user_id: number, body: IUserRegister) => {
  console.log("masuk auth servise buat update");
  const updateProfile = await db.user.update({
    where: {
      id: user_id,
    },
    data: {
      fullName: body.fullName,
      userName: body.userName,
      bio: body.bio,
      profile_pic: body.profile_pic,
    },
  });

  return updateProfile;
};
