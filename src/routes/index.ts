import { Router } from "express";
import authRoute from "./AuthRoute";
import postRoute from "./PostRoute";
import replyRoute from "./ReplyRoute";
import userRoute from "./UserRoute";
import likeRoute from "./likeRoute";
import followRoute from "./FollowRoute";

const route = Router();

route.use("/auth", authRoute);
route.use("/posts", postRoute);
route.use("/reply", replyRoute);
route.use("/user", userRoute);
route.use("/like", likeRoute);
route.use("/follow", followRoute);

export default route;
