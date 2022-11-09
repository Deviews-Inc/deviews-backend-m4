import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { hash } from "bcryptjs";
import User from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import Techs from "../../entities/techs.entity";
import UsersTechs from "../../entities/usersTechs.entity";

const createUserService = async ({
  name,
  username,
  email,
  password,
  bio,
  profile_picture,
  techs,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const techRepository = AppDataSource.getRepository(Techs);
  const usersTechsRepository = AppDataSource.getRepository(UsersTechs);
  const emailAlreadyExists = await userRepository.findOneBy({ email });
  const usernameAlreadyExists = await userRepository.findOneBy({ username });
  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 409);
  }
  if (usernameAlreadyExists) {
    throw new AppError("Username already exists", 409);
  }
  await Promise.all(
    techs.map(async (tech) => {
      const techVerifyExists = await techRepository.findOneBy({
        id: tech,
      });

      if (!techVerifyExists) {
        throw new AppError("Tech not found", 404);
      }
    })
  );

  const user = userRepository.create({
    name,
    username,
    email,
    password: await hash(password, 10),
    bio,
    profile_picture,
  });
  await userRepository.save(user);

  await Promise.all(
    techs.map(async (tech) => {
      const techs = await techRepository.findOneBy({ id: tech });
      const userTech = usersTechsRepository.create({
        techs: techs!,
        user: user,
      });

      await usersTechsRepository.save(userTech);
    })
  );

  const returnUser = await userRepository.find({
    where: {
      id: user.id,
    },
    relations: {
      usersTechs: {
        techs: true,
      },
    },
  });

  return returnUser;
};
export default createUserService;
