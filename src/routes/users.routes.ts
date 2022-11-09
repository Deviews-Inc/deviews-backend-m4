import { Router } from "express";
import { deleteTechController } from "../controllers/techs.controllers";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
} from "../controllers/users.controllers";
import isActiveMiddleware from "../middlewares/isActive.middleware";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";
import verifyOwnerAccountMiddleware from "../middlewares/verifyOwnerAccount.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get(
  "",
  isLoggedInMiddleware,

  listUsersController
);
usersRoutes.get("/:id", isLoggedInMiddleware, retrieveUserController);
usersRoutes.patch(
  "/:id",
  isLoggedInMiddleware,
  verifyOwnerAccountMiddleware,
  isActiveMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  isLoggedInMiddleware,
  verifyOwnerAccountMiddleware,
  deleteUserController
);

export default usersRoutes;
