import { Request, Response } from "express";
import * as authService from "../services/AuthService";
import { IUserRegister } from "../types/Auth";
import errorHandler from "../utils/errorHandler";

export const register = async (req: Request, res: Response) => {
  try {
    // ambil data dari body
    const body = req.body;
    console.log(body);

    //kirim data body ke function service register
    const user = await authService.register(body as IUserRegister);

    res.json({ message: "User created successfully", data: user });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // req.body itu dari parameter kedua di client
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.status(200).json({ token: token });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

//ini untuk mengirim data user ke front end
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    res.json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      bio: user.bio,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error as unknown as Error);
  }
};

export const update = async (req: Request, res: Response) => {
  console.log("ini udah masuk ke controller");

  const user = await authService.update(parseInt(req.params.user_id), req.body);

  console.log(user);

  res.json(user);
};
