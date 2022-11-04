import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import Posts from "../../entities/posts.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { ICommentsRequest } from "../../interfaces/comments";

const createCommentsService = async ({
  content,
  user,
  post,
}: ICommentsRequest): Promise<Comments> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Posts);

  const searchUser = await userRepository.findOneBy({
    id: user,
  });

  const searchPost = await postRepository.findOneBy({
    id: post,
  });

  if (!searchPost) {
    throw new AppError("Post does not exist");
  }

  const newComment = commentsRepository.create({
    content: content,
    post: searchPost,
    user: searchUser!,
  });

  await commentsRepository.save(newComment);

  return newComment;
};

export default createCommentsService;
