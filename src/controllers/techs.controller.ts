//codar aqui

import { Request, Response } from "express";
import deleteTechService from "../services/techs/deleteTech.service";

export const deleteTechController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTech = await deleteTechService(id);

  return res.status(204).json(deletedTech);
};
