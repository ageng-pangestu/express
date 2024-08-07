import { Request, Response } from "express";
import * as authService from "../services/AuthService";
import { IUserRegister } from "../types/Auth";

export const login = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);

      if (!user) {
         return res
            .status(401)
            .json({ message: "Invalid username or password" });
      }

      res.status(200).json({
         token: user,
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

export const register = async (req: Request, res: Response) => {
   try {
      const body = req.body;
      const user = await authService.register(body as IUserRegister);

      res.json(user);
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
};

export const checkAuth = async (req: Request, res: Response) => {
   try {
      const user = res.locals.user;

      res.json({
         fullName: user.fullName,
         username: user.username,
         email: user.email,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
};
