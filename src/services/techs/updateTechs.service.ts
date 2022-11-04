import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";
import AppError from "../../errors/appError";
import { ITechUpdate } from "../../interfaces/techs";


const updateTechsService = async ({
  tech_name,
  id,
}: ITechUpdate): Promise<Techs> => {
  const userRepository = AppDataSource.getRepository(Techs);
  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("tech not found", 404);
  }

  await userRepository.update(id, {
    tech_name: tech_name,
  });

  const tech = await userRepository.findOneBy({
    id,
  });

  return tech!;
};

export default updateTechsService;
