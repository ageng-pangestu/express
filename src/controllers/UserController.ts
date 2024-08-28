import * as userService from "../services/UserService";
import { Request, Response } from "express";

export const getAllUser = async (req: Request, res: Response) => {
  const users = await userService.findAllUser(parseInt(req.params.user_id));
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.findUserById(parseInt(req.params.user_id));
  res.json(user);
};
