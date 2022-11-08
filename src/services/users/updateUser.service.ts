import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";
import User from "../../entities/user.entity";
import UsersTechs from "../../entities/usersTechs.entity";
import AppError from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
const updateUserService = async ({
  name,
  username,
  email,
  password,
  bio,
  profile_picture,
  id,
  isActive,
  userId,
  techs,
}: IUserUpdate) => {
  if (id !== undefined || isActive !== undefined) {
    throw new AppError("id and isActive fields cannot be updated", 401);
  }
  const userRepository = AppDataSource.getRepository(User);
  const techRepository = AppDataSource.getRepository(Techs);
  const usersTechsRepository = AppDataSource.getRepository(UsersTechs);
  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (techs) {
    await Promise.all(
      techs.map(async (tech) => {
        const techVerifyExists = await techRepository.findOneBy({
          id: tech,
        });

        if (!techVerifyExists) {
          throw new AppError("Tech not found", 404);
        }

        const verifyTechUserExists = await usersTechsRepository.findOneBy({
          techs: techVerifyExists,
          user: findUser,
        });

        if (verifyTechUserExists) {
          throw new AppError("Tech already exists for this user", 406);
        }
      })
    );

    await Promise.all(
      techs.map(async (tech) => {
        const techs = await techRepository.findOneBy({ id: tech });
        const userTech = usersTechsRepository.create({
          techs: techs!,
          user: findUser,
        });

        await usersTechsRepository.save(userTech);
      })
    );
  }

  await userRepository.update(findUser.id, {
    name,
    username,
    email,
    password: password ? await hash(password, 10) : findUser.password,
    bio,
    profile_picture,
  });

  const user = await userRepository.find({
    where: {
      id: userId,
    },
    relations: {
      usersTechs: {
        techs: true,
      },
    },
  });
  return user;
};

export default updateUserService;
