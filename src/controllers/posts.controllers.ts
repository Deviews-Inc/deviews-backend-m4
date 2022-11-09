import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import Posts from "../entities/posts.entity";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";
import listPostsService from "../services/posts/listPosts.service";
import listPostsUserService from "../services/posts/listPostsUser.service";
import retrievePostService from "../services/posts/retrivePost.service";
import updatePostService from "../services/posts/updatePost.service";

export const createPostController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;

  const createPost = await createPostService(userId, data);

  return res.status(201).json({ data: instanceToPlain(createPost) });
};

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  return res.json({ data: instanceToPlain(posts) });
};

export const listPostsUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const posts = await listPostsUserService(id);
  return res.json({ data: instanceToPlain(posts) });
};

export const retrievePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await retrievePostService(id);
  return res.json({ data: instanceToPlain(post) });
};

export const updatePostController = async (req: Request, res: Response) => {
  const post = req.body;
  post.id = req.params.id;
  post.id_user = req.user.id;
  const updatedPost = await updatePostService(post);
  return res.json({ data: updatedPost });
};

export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idUser = req.user.id;
  await deletePostService(id, idUser);

  return res.status(204).send();
};
