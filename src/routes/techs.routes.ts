import { Router } from "express";
import {
  allTechsController,
  updateTechsController,
  createTechController,
  deleteTechController,
} from "../controllers/techs.controllers";
import isLoggedInMiddleware from "../middlewares/isLoggedIn.middleware";

const techsRoutes = Router();

techsRoutes.post("", createTechController);
techsRoutes.get("", allTechsController);
techsRoutes.patch("", updateTechsController);
techsRoutes.delete("/techs/:id", deleteTechController);
export default techsRoutes;
