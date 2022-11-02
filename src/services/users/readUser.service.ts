import AppDataSource from "../../data-source";
import Users from "../../entities/Users";

const listUsersService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(Users);
  const user = await usersRepository.findOneBy({
    id
  });
  return user;
}

export default listUsersService;