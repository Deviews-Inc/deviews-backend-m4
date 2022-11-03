import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const readUserService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({
    id
  });
  return user;
}

export default readUserService;