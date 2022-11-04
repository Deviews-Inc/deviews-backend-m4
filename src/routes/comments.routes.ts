import { Router } from "express";
import { createCommentsController } from "../controllers/comments.controller";

const CommentRoutes = Router();

CommentRoutes.post("", createCommentsController);

export default CommentRoutes;
