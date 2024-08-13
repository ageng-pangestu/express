import authRoute from "./AuthRoute";
import postRoute from "./PostRoute";
import { Router } from "express";
import replyRoute from "./RepliesRoute";

const route = Router();

route.use("/auth", authRoute);
route.use("/posts", postRoute);
route.use("/reply", replyRoute);

export default route;
