import { Router } from "express";
import authorization from "../middlewares/Authorization";
import * as likeController from "../controllers/LikeController";

const likeRoute = Router();
likeRoute.post("/:post_id", authorization, likeController.like);

likeRoute.get("/checklike/:post_id", authorization, likeController.checkLike);

likeRoute.get("/countlike/:post_id", likeController.countLike);

export default likeRoute;
