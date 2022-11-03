import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";

const allTechsService = async () => {
  const techsRepository = AppDataSource.getRepository(Techs);
  const techs = await techsRepository.find();

  return techs;
};

export default allTechsService;
