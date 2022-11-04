import { Router } from "express";
import {
  createCommentsController,
  deleteCommentController,
} from "../controllers/comments.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const commentRoutes = Router();

commentRoutes.post("/:id", isLoggedInMiddleware, createCommentsController);
commentRoutes.delete("/:id", isLoggedInMiddleware, deleteCommentController);

export default commentRoutes;
