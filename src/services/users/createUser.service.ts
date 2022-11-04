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

  return user;
};

export default createUserService;
