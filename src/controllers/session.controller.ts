import { Request, response, Response } from "express";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const login = req.body;
  const token = await createSessionService(login);
  return response.json({
    token,
  });
};

export { createSessionController };
