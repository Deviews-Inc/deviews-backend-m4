import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const listPostsUserService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userExists = await usersRepository.findOneBy({
    id
  })
  
  if (!userExists){
    throw new AppError("User not found", 404);
  }

  const userPosts = await usersRepository.findOne({
    where: {
      id
    },
    relations: {
      posts: true
    }
  });
  
  return userPosts?.posts;
};

export default listPostsUserService;
