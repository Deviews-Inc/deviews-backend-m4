import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";

const deleteUserService = async (id: string): Promise<string> => {
  // const userRepository = AppDataSource.getRepository(User);
  // const findUser = await userRepository.findOneBy({
  //     id,
  // })
  // if(!findUser){
  //     throw new AppError("User not found", 404)
  // }
  //   if (!findUser.isActive) {
  //     throw new AppError("User not found", 400);
  //   }

  //   await userRepository.update(id, {
  //     isActive: false,
  //   });

  return "User deleted";
};

export default deleteUserService;