import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";

const allTechsService = async (): Promise<Techs[]> => {
  const techsRepository = AppDataSource.getRepository(Techs);
  const techs = await techsRepository.find();

  return techs;
};

export default allTechsService;
