import { Router } from "express";
import {
  createCommentsController,
  deleteCommentController,
  updateCommentsController,
} from "../controllers/comments.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const commentRoutes = Router();

commentRoutes.post("/:id", isLoggedInMiddleware, createCommentsController);
commentRoutes.patch("/:id", isLoggedInMiddleware, updateCommentsController);
commentRoutes.delete("/:id", isLoggedInMiddleware, deleteCommentController);

export default commentRoutes;
