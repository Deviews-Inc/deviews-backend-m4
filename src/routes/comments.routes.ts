import { Router } from "express";
<<<<<<< Updated upstream
import { createCommentsController } from "../controllers/comments.controller";
=======
import {
  createCommentsController,
  deleteCommentController,
  updateCommentsController,
} from "../controllers/comments.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";
>>>>>>> Stashed changes

const CommentRoutes = Router();

<<<<<<< Updated upstream
CommentRoutes.post("", createCommentsController);
=======
commentRoutes.post("/:id", isLoggedInMiddleware, createCommentsController);
commentRoutes.delete("/:id", isLoggedInMiddleware, deleteCommentController);
commentRoutes.patch("/:id", isLoggedInMiddleware, updateCommentsController);
>>>>>>> Stashed changes

export default CommentRoutes;
