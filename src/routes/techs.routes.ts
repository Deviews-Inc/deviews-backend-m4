import { Router } from "express";
import {
  allTechsController,
  createTechController,
} from "../controllers/techs.controller";

const techsRoutes = Router();

techsRoutes.post("", createTechController);
techsRoutes.get("", allTechsController);

export default techsRoutes;
