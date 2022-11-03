import { Request, Response } from "express";
import deletePostService from "../services/posts/deletePost.service";

//codar aqui
export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePostService(id);

  return res.status(204).send();
};
