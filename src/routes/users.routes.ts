import { Router } from "express";
import {
  createUserController,
  listUsersController,
  readUserController,
  updateUserController,
} from "../controllers/users.controller";
import isActiveMiddleware from "../middlewares/isActive.middleware";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get(
  "",
  isLoggedInMiddleware,
  isActiveMiddleware,
  listUsersController
);
usersRoutes.get(
  "/:id",
  isLoggedInMiddleware,
  isActiveMiddleware,
  readUserController
);
usersRoutes.patch(
  "/:id",
  isLoggedInMiddleware,
  isActiveMiddleware,
  updateUserController
);
usersRoutes.delete("/:id");

export default usersRoutes;
