import { Request, response, Response } from "express";
import listUsersService from "../services/users/listUsers.service";
import readUserService from "../services/users/readUser.service";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
}

const readUserController = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await readUserService(id);
  return res.json(user);
}

export { listUsersController, readUserController};