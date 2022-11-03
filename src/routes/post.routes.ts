import { Router } from "express";
import {
  createPostController,
  deletePostController,
  listPostsController,
  listPostsUserController,
  retrievePostController,
} from "../controllers/posts.controller";
import isActiveMiddleware from "../middlewares/isActive.middleware";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const postRoutes = Router();

postRoutes.post("", isLoggedInMiddleware, createPostController);
postRoutes.delete("/:id", isLoggedInMiddleware, deletePostController);
postRoutes.get("", isLoggedInMiddleware, listPostsController);
postRoutes.get("/:id", isLoggedInMiddleware, retrievePostController);
postRoutes.get("/user/:id", isLoggedInMiddleware, listPostsUserController);

export default postRoutes;
