import { Router } from "express";
import * as authController from "../controllers/AuthController";
import authorization from "../middlewares/Authorization";

const authRoute = Router();
authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/user", authorization, authController.checkAuth);
authRoute.put("/:user_id", authController.update);
export default authRoute;
