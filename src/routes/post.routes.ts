import { Router } from "express";
import {
  createPostController,
  deletePostController,
  updatePostController,
} from "../controllers/posts.controller";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const postRoutes = Router();

postRoutes.delete("/:id", isLoggedInMiddleware, deletePostController);
postRoutes.patch("/:id", updatePostController);
postRoutes.post("", createPostController);

export default postRoutes;
