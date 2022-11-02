import AppDataSource from "../../data-source";
import { Jwt } from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { IUserLogin } from "../../interfaces/users";
const createSessionService = async({email,password}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExists = userRepository.findOneBy({
    email
  })
  const correctPassword = compareSync(password, userExists.password);
}