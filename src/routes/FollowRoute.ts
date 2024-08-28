import { Router } from "express";
import authorization from "../middlewares/Authorization";
import * as followController from "../controllers/FollowController";

const followRoute = Router();
followRoute.post("/:following_id", authorization, followController.follow);

followRoute.get("/checkfollow/:following_id", authorization, followController.checkFollow);

export default followRoute;
