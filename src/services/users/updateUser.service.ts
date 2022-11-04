import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
const updateUserService = async ({
  name,
  username,
  email,
  password,
  bio,
  profilePicture,
  id,
  isActive,
  userId,
}: IUserUpdate) => {
  if (id || isActive) {
    throw new AppError("id and isActive fields cannot be updated");
  }
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(findUser.id, {
    name,
    username,
    email,
    password: password ? await hash(password, 10) : findUser.password,
    bio,
    profilePicture,
  });

  const user = await userRepository.findOneBy({
    id: userId,
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
};

export default updateUserService;
