import { Router } from "express";
import { allTechsController } from "../controllers/techs.controller";

const techsRoutes = Router();

techsRoutes.get("", allTechsController);

export default techsRoutes;
