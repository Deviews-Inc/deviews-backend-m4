import { Router } from "express";
import {
  createPostController,
  deletePostController,
  listPostsController,
  listPostsUserController,
  retrievePostController,
  updatePostController,
} from "../controllers/posts.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const postRoutes = Router();

postRoutes.post("", isLoggedInMiddleware, createPostController);
postRoutes.delete("/:id", isLoggedInMiddleware, deletePostController);
postRoutes.get("", isLoggedInMiddleware, listPostsController);
postRoutes.get("/:id", isLoggedInMiddleware, retrievePostController);
postRoutes.get("/user/:id", isLoggedInMiddleware, listPostsUserController);
postRoutes.patch("/:id", isLoggedInMiddleware, updatePostController);

export default postRoutes;
