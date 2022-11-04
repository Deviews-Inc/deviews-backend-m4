import { Request, Response } from "express";
import { ICommentsRequest, ICommentUpdate } from "../interfaces/comments";
import createCommentsService from "../services/comments/createComments.service";
import deleteCommentsService from "../services/comments/deleteComments.service";
import updateCommentsService from "../services/comments/updateComments.service";

export const updateCommentsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const data: ICommentUpdate = req.body;

  const updateComment = updateCommentsService(id, userId, data);

  return res.status(200).json(updateComment);
};

export const createCommentsController = async (req: Request, res: Response) => {
  const data: ICommentsRequest = req.body;
  data.user = req.user.id;
  const createComment = await createCommentsService(data);
  return res.status(201).json(createComment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteCommentsService(id);
  return res.status(204).send();
};
