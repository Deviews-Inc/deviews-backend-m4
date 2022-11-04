import { Router } from "express";
import { createCommentsController } from "../controllers/comments.controller";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const commentRoutes = Router();

commentRoutes.post("/:id", isLoggedInMiddleware, createCommentsController);
commentRoutes.delete("/:id", isLoggedInMiddleware, deleteCommentController);
commentRoutes.patch("/:id", isLoggedInMiddleware, updateCommentsController);

export default commentRoutes;
