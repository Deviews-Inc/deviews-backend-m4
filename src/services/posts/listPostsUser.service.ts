import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import User from "../../entities/user.entity";

const listPostsUserService = async (id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const usersRepository = AppDataSource.getRepository(User);

  
  const posts = await usersRepository.findOne({
    where: {
      id
    },
    relations: {
      posts: true
    }
    
  });
 
  return posts;
};

export default listPostsUserService;
