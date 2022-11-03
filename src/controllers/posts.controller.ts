import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";

//codar aqui
export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePostService(id);

  return res.status(204).send();
};

export const createPostController = async (req: Request, res: Response) => {
  const data: IPostRequest = req.body;
  const userId = req.user.id;

  const createPost = await createPostService(userId, data);

  return res.status(201).json(createPost);
};
