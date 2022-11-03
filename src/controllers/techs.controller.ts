import { Request, Response } from "express";
import Techs from "../entities/techs.entity";
import { ITechUpdate } from "../interfaces/techs";
import allTechsService from "../services/techs/allTechs.service";
import updateTechsService from "../services/techs/updateTechs.service";
import deleteTechService from "../services/techs/deleteTech.service";

export const deleteTechController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTech = await deleteTechService(id);

  return res.status(204).json(deletedTech);
};

export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.status(200).json(techs);
};

export const updateTechsController = async (req: Request, res: Response) => {
  const tech: ITechUpdate = req.body;
  const updatedTech = await updateTechsService(tech);
  if (updatedTech instanceof Techs) {
    return res.status(200).json(updatedTech);
  }
};
