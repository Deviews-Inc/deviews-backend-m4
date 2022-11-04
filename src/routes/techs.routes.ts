import { Router } from "express";
import {
  allTechsController,
  updateTechsController,
  createTechController,
} from "../controllers/techs.controller";

const techsRoutes = Router();

techsRoutes.post("", createTechController);
techsRoutes.get("", allTechsController);
techsRoutes.patch("", updateTechsController);

export default techsRoutes;
