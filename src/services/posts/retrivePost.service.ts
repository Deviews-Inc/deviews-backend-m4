import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import AppError from "../../errors/appError";

const retrievePostService = async (id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const post = await postsRepository.findOneBy({
    id
  })
  if (!post){
    throw new AppError("Post not found", 404);
  }
  
  return post;
};

export default retrievePostService;
