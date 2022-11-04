import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { IPostRequest } from "../../interfaces/posts";

const createPostService = async (
  userId: string,
  { content }: IPostRequest
): Promise<Posts> => {
  const postRepository = AppDataSource.getRepository(Posts);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  const postAlreadyExists = await postRepository.findOneBy({
    user: user!,
    content,
  });

  if (postAlreadyExists) {
    throw new AppError("Post already exists in this account");
  }

  const newPost = postRepository.create({
    content,
    user: user!,
  });

  await postRepository.save(newPost);

  return newPost;
};

export default createPostService;
