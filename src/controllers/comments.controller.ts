import { Request, Response } from "express";
import { ICommentUpdate } from "../interfaces/comments";
import updateCommentsService from "../services/comments/updateComments.service";

export const updateCommentsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const data: ICommentUpdate = req.body;

  const updateComment = updateCommentsService(id, userId, data);

  return res.status(200).json(updateComment);
};
