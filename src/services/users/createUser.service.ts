import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users.interfaces";
import { hash } from "bcryptjs";

const createUserService = async ({
  name,
  user_name,
  email,
  password,
  bio,
  profile_picture,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository();

  const userAlreadyExists = userRepository.findOneBy({ email });

  if (userAlreadyExists) {
    throw new AppError("User already exists");
  }

  const user = userRepository.create({
    name,
    user_name,
    email,
    password: await hash(password, 10),
    bio,
    profile_picture,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
