import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";

const listPostsUserService = async (id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const posts = await postsRepository.find({
    where: {
      id
    },
    relations: {
      user: true
    }
    
  });
  return posts;
};

export default listPostsUserService;
