import { Request, Response } from "express";
import allTechsService from "../services/techs/allTechs.service";
import deleteTechService from "../services/techs/deleteTech.service";

export const deleteTechController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTech = await deleteTechService(id);

  return res.status(204).json(deletedTech);

export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.status(200).json(techs);
};
