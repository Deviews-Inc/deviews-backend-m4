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
  id_user,
  image,
}: ICommentUpdate): Promise<Posts> => {
  const postRepository = AppDataSource.getRepository(Posts);

  const findPost = await postRepository.find({
    where: {
      id: id,
    },
    relations: {
      user: true,
    },
  });

  if (findPost[0].user.id != id_user) {
    throw new AppError("You're not the owner of this post", 401);
  }

  if (!findPost) {
    throw new AppError("Post not found", 404);
  }

  if (comments || createdAt || firePosts || user) {
    throw new AppError("This field cannot be updated");
  }

  await postRepository.update(findPost[0].id, {
    content,
    image,
  });

  const post = await postRepository.findOneBy({
    id,
  });

  return post!;
};

export default updatePostService;
