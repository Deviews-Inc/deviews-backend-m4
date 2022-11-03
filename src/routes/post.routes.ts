import { Router } from "express";
import { deletePostController } from "../controllers/posts.controller";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const postRoutes = Router();

postRoutes.delete("/:id", isLoggedInMiddleware, deletePostController);

export default postRoutes;
