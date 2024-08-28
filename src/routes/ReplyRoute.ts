import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import authorization from "../middlewares/Authorization";
import upload from "../middlewares/fileUpload";

const replyRoute = Router();

replyRoute.post("/:post_id", authorization, upload.single("image"), replyController.createReply);

replyRoute.get("/:post_id", replyController.findAllReply);

replyRoute.get("/countreply/:post_id", replyController.countReply);

replyRoute.get("/detail/:post_id", replyController.findByIdReply);

replyRoute.put("/:id", replyController.updateReply);

replyRoute.delete("/:id", replyController.deleteReply);

export default replyRoute;
