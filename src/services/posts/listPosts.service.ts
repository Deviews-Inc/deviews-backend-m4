import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";

const listPostsService = async () => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const posts = await postsRepository.find();
  return posts;
};

export default listPostsService;
