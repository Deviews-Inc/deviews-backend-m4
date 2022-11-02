import { Router } from "express";
import {
  createUserController, updateUserController,
  
} from "../controllers/users.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.patch("/:id", updateUserController);

export default userRoutes;
