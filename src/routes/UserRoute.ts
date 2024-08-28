import { Router } from "express";
import * as userController from "../controllers/UserController";

const userRoute = Router();
userRoute.get("/all/:user_id", userController.getAllUser);
userRoute.get("/:user_id", userController.getUserById);
export default userRoute;
