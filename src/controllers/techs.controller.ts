import { Request, Response } from "express";
import allTechsService from "../services/techs/allTechs.service";

//codar aqui
export const allTechsController = async (req: Request, res: Response) => {
  const techs = await allTechsService();

  return res.status(200).json(techs);
};
