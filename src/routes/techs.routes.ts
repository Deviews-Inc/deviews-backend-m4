import { Router } from "express";
import {
  allTechsController,
  updateTechsController,
  createTechController,
  deleteTechController,
} from "../controllers/techs.controllers";

const techsRoutes = Router();

techsRoutes.post("", createTechController);
techsRoutes.get("", allTechsController);
techsRoutes.patch("/:id", updateTechsController);
techsRoutes.delete("/:id", deleteTechController);
export default techsRoutes;
