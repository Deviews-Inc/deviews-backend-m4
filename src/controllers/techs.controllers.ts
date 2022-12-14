import { Request, Response } from "express";
import Techs from "../entities/techs.entity";
import allTechsService from "../services/techs/allTechs.service";
import updateTechsService from "../services/techs/updateTechs.service";
import createTechService from "../services/techs/createTech.service";
import deleteTechService from "../services/techs/deleteTech.service";

export const createTechController = async (req: Request, res: Response) => {
  const tech = req.body;
  const createdTech = await createTechService(tech);

  return res.status(201).json({ data: createdTech });
};

export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.json({ data: techs });
};

export const updateTechsController = async (req: Request, res: Response) => {
  const tech = req.body;
  tech.id = req.params.id;
  const updatedTech = await updateTechsService(tech);
  if (updatedTech instanceof Techs) {
    return res.json({ data: updatedTech });
  }
};

export const deleteTechController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteTechService(id);

  return res.status(204).send();
};
