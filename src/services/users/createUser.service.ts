import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { hash } from "bcryptjs";
import User from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  name,
  username,
  email,
  password,
  bio,
  profilePicture,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOneBy({ email });

  if (userAlreadyExists) {
    throw new AppError("User already exists");
  }

  const user = userRepository.create({
    name,
    username,
    email,
    password: await hash(password, 10),
    bio,
    profilePicture,
  });

  await userRepository.save(user);

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

export default createUserService;
