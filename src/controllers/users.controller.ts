import { Request, response, Response } from "express";
import User from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import readUserService from "../services/users/readUser.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(createdUser);
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

export const readUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await readUserService(id);
  return res.json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  user.userId = req.params.id;
  const updatedUser = await updateUserService(user);
  if (updatedUser instanceof User) {
    return res.status(201).json(updatedUser);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await deleteUserService(id);

  return res.status(204).json(deletedUser);
};
