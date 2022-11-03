import { Request, Response } from "express";
import Posts from "../entities/posts.entity";
import { IPostRequest } from "../interfaces/posts";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";
import updatePostService from "../services/posts/updatePost.service";

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

export const updatePostController = async (req: Request, res: Response) => {
  const post = req.body;
  post.id = req.params.id;
  const updatedPost = await updatePostService(post);
  if (updatedPost instanceof Posts) {
    return res.json(updatedPost);
  }
};
