import { Router } from "express";
import {
  firesCommentController,
  firesPostController,
} from "../controllers/fires.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const firesRoutes = Router();

firesRoutes.post("/posts/:idPost", isLoggedInMiddleware, firesPostController);
firesRoutes.post(
  "/comments/:idComment",
  isLoggedInMiddleware,
  firesCommentController
);

export default firesRoutes;
