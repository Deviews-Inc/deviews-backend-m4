import AppDataSource from "../../data-source";
import Techs from "../../entities/techs.entity";
import AppError from "../../errors/appError";

const deleteTechService = async (id: string) => {
  const techRepository = AppDataSource.getRepository(Techs);

  const findTech = await techRepository.findOneBy({
    id,
  });

  if (!findTech) {
    throw new AppError("Tech not found", 404);
  }

  await techRepository.delete(id);

  return;
};

export default deleteTechService;
