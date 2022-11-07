import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import AppError from "../../errors/appError";

const deletePostService = async (id: string, idUser: string) => {
  const postRepository = AppDataSource.getRepository(Posts);
  const verifyPost = await postRepository.find({
    where: {
      id: id,
    },
    relations: {
      user: true,
    },
  });

  if (verifyPost[0].user.id != idUser) {
    throw new AppError("You're not the owner of this post", 401);
  }

  if (!verifyPost) {
    throw new AppError("Post not found", 404);
  }

  await postRepository.delete(id);
  return;
};

export default deletePostService;
