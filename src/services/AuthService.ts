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
      username: user.username,
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
      OR: [{ email: email }, { username: email }],
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

  //ini token
  const token = jwt.sign(existedUser, process.env.SECRET_KEY! || "secret", {
    expiresIn: "1d",
  });

  return token;
};
