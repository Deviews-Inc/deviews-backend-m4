import { Request, Response } from "express";
import firesPostService from "../services/fires/firesPost.service";

export const firesPostController = async (req: Request, res: Response) => {
  const idPost = req.params.idPost;
  const idUser = req.user.id;

  const createdFire = await firesPostService(idPost, idUser);

  return res.status(200).json({
    message: createdFire,
  });
};
