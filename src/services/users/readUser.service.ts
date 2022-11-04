import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const readUserService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({
    id
  });
  const returnUser = {
    bio: user!.bio,
    comments: user!.comments,
    email: user!.email,
    fireComments: user!.fireComments,
    firePosts: user!.firePosts,
    id: user!.id,
    isActive: user!.isActive,
    name: user!.name,
    posts: user!.posts,
    profilePicture: user!.profilePicture,
    techs: user!.techs,
    username: user!.username,
  }
  return returnUser! ;
}

export default readUserService;