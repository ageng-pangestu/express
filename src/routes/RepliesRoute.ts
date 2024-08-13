import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import authorization from "../middlewares/Authorization";
import upload from "../middlewares/fileUpload";

const replyRoute = Router();

replyRoute.get("/", replyController.findAllPost);

replyRoute.get("/:id", replyController.findByIdPost);

replyRoute.post("/:post_id", authorization, upload.single("image"), replyController.createPost);

replyRoute.put("/:id", replyController.updatePost);

replyRoute.delete("/:id", replyController.deletePost);

export default replyRoute;
