import { Router } from "express";
import {
  listUsersController,
  readUserController,
} from "../controllers/users.controller";
import isActiveMiddleware from "../middlewares/isActive.middleware";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const usersRoutes = Router();

usersRoutes.post("");
usersRoutes.get("",isLoggedInMiddleware, isActiveMiddleware ,listUsersController);
usersRoutes.get("/:id", isLoggedInMiddleware, isActiveMiddleware, readUserController);
usersRoutes.patch("/:id");
usersRoutes.delete("/:id");

export default usersRoutes;
