import { Router } from "express";
import { deleteTechController } from "../controllers/techs.controllers";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  readUserController,
  updateUserController,
} from "../controllers/users.controllers";
import isActiveMiddleware from "../middlewares/isActive.middleware";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get(
  "",
  isLoggedInMiddleware,

  listUsersController
);
usersRoutes.get(
  "/:id",
  isLoggedInMiddleware,

  readUserController
);
usersRoutes.patch(
  "/:id",
  isLoggedInMiddleware,
  isActiveMiddleware,
  updateUserController
);
usersRoutes.delete("/:id", deleteUserController);

usersRoutes.delete("/techs/:id", deleteTechController);

export default usersRoutes;
