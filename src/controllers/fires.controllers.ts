import { Request, Response } from "express";
import firesCommentService from "../services/fires/firesComment.service";
import firesPostService from "../services/fires/firesPost.service";

export const firesPostController = async (req: Request, res: Response) => {
  const idPost = req.params.idPost;
  const idUser = req.user.id;

  const createdFire = await firesPostService(idPost, idUser);

  return res.json({
    message: createdFire,
  });
};

export const firesCommentController = async (req: Request, res: Response) => {
  const idComments = req.params.idComment;
  const idUser = req.user.id;

  const createdFire = await firesCommentService(idComments, idUser);

  return res.json({
    message: createdFire,
  });
};
