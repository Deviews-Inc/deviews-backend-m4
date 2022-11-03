import { Router } from "express";
import { firesPostController } from "../controllers/fires.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const firesRoutes = Router();

firesRoutes.post("/posts/:id", isLoggedInMiddleware, firesPostController);

export default firesRoutes;
