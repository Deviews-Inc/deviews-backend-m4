import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";
import AppError from "../../errors/appError";
import { ITechUpdate } from "../../interfaces/techs";

const createTechService = async ({
  tech_name,
}: ITechUpdate): Promise<Techs> => {
  const techRepository = AppDataSource.getRepository(Techs);

  const techAlreadyExists = await techRepository.findOneBy({
    tech_name,
  });

  if (techAlreadyExists) {
    throw new AppError("Tech already exists", 409);
  }

  const tech = techRepository.create({
    tech_name,
  });

  await techRepository.save(tech);

  return tech;
};

export default createTechService;
