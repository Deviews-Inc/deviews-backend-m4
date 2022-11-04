import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import AppError from "../../errors/appError";
import { ICommentUpdate } from "../../interfaces/comments";

const updatePostService = async ({
  content,
  comments,
  createdAt,
  firePosts,
  user,
  id,
}: ICommentUpdate): Promise<Posts> => {
  const postRepository = AppDataSource.getRepository(Posts);

  const findPost = await postRepository.findOneBy({
    id,
  });

  if (!findPost) {
    throw new AppError("Post not found", 404);
  }

  if (comments || createdAt || firePosts || user) {
    throw new AppError("This field cannot be updated");
  }

  await postRepository.update(findPost.id, {
    content,
  });

  const post = await postRepository.findOneBy({
    id,
  });

  return post!;
};

export default updatePostService;
