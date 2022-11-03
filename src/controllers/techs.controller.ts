import e, { Request, Response } from "express";
import allTechsService from "../services/techs/allTechs.service";
import createTechService from "../services/techs/createTech.service";
import deleteTechService from "../services/techs/deleteTech.service";

export const createTechController = async (req: Request, res: Response) => {
  const tech = req.body;
  const createdTech = await createTechService(tech);

  return res.status(201).json(createdTech);
};

export const deleteTechController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTech = await deleteTechService(id);

  return res.status(204).json(deletedTech);
};

export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.status(200).json(techs);
};
