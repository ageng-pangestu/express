import { Router } from "express";
import * as authController from "../controllers/AuthController";
import Authorization from "../middlewares/Authorization";

const authRoute = Router();
authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/me", Authorization, authController.checkAuth);
export default authRoute;
