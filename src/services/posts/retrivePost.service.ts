import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";

const retrievePostService = async (id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const post = await postsRepository.findOneBy({
    id
  })
  
  return post;
};

export default retrievePostService;
