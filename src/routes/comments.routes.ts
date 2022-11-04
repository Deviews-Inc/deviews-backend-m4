import { Router } from "express";
import { createCommentsController } from "../controllers/comments.controllers";

const CommentRoutes = Router();

CommentRoutes.post("", createCommentsController);

export default CommentRoutes;
