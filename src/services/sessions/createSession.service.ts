import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { IUserLogin } from "../../interfaces/users";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import "dotenv/config";
const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({
    email,
  });
  if (!userExists) {
    throw new AppError("Invalid email or password", 403);
  }

  if (!userExists.isActive) {
    throw new AppError("This user is not active", 401);
  }

  const correctPassword = compareSync(password, userExists.password);
  if (!correctPassword) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      id: userExists.id,
      isActive: userExists.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: userExists.id,
    }
  );

  return token;
};

export default createSessionService;
