import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const readUserService = async (id: string): Promise<User> => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({
    id
  });
  if (!user){
    throw new AppError("User does not exists", 404);
  }
  return user!;
}

export default readUserService;