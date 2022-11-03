import { Router } from "express";
import {
  allTechsController,
  updateTechsController,
} from "../controllers/techs.controller";

const techsRoutes = Router();

techsRoutes.get("", allTechsController);
techsRoutes.patch("", updateTechsController);

export default techsRoutes;
