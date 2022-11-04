import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/posts";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";
import listPostsService from "../services/posts/listPosts.service";
import listPostsUserService from "../services/posts/listPostsUser.service";
import retrievePostService from "../services/posts/retrivePost.service";

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

  return res.status(201).json(instanceToPlain(createPost));
};

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  return res.json(instanceToPlain(posts));
};

export const listPostsUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const posts = await listPostsUserService(id);
  return res.json(instanceToPlain(posts));
};

export const retrievePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await retrievePostService(id);
  return res.json(instanceToPlain(post));
};
