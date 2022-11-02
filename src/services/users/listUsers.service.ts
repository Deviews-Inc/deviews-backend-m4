import AppDataSource from "../data-source";
import Users from "../entities/Users";

const listUsersService = async () => {
  const usersRepository = AppDataSource.getRepository(Users);
  const users = await usersRepository.find();
  return users;
}

export default listUsersService;