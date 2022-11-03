import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import AppError from "../../errors/appError";

const deletePostService = async (id: string) => {
  const postRepository = AppDataSource.getRepository(Posts);
  const verifyPost = postRepository.findOneBy({
    id: id,
  });

  if (!verifyPost) {
    throw new AppError("Post not exists", 400);
  }
  
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Posts)
    .where("id = :id", { id: id })
    .execute();

  return;
};

export default deletePostService;