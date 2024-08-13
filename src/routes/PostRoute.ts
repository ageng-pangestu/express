import { Router } from "express";
import * as postController from "../controllers/PostController";
import authorization from "../middlewares/Authorization";
import upload from "../middlewares/fileUpload";

const postRoute = Router();

postRoute.get("/", postController.findAllPost);

postRoute.get("/:id", postController.findByIdPost);

postRoute.post("/", authorization, upload.single("image"), postController.createPost);

postRoute.put("/:id", postController.updatePost);

postRoute.delete("/:id", postController.deletePost);

export default postRoute;
