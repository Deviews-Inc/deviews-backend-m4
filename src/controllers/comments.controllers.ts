import { Request, Response } from "express";
import createCommentsService from "../services/comments/createComments.service";
import updateCommentsService from "../services/comments/updateComments.service";

export const createCommentsController = async (req: Request, res: Response) => {
  const data = req.body;
  data.user = req.user.id;

  const createComment = await createCommentsService(data);
  return res.status(201).json(createComment);
};

export const updateCommentsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const data = req.body;

  const updateComment = await updateCommentsService(id, userId, data);

  return res.json(updateComment);
};
