import { Request, Response } from "express";
import Techs from "../entities/techs.entity";
import { ITechUpdate } from "../interfaces/techs";
import allTechsService from "../services/techs/allTechs.service";
import updateTechsService from "../services/techs/updateTechs.service";

export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.status(200).json(techs);
};

export const updateTechsController = async (req: Request, res: Response) => {
  const tech: ITechUpdate = req.body;
  const updatedTech = await updateTechsService(tech);
  if (updatedTech instanceof Techs) {
    return res.status(201).json(updatedTech);
  }
};
