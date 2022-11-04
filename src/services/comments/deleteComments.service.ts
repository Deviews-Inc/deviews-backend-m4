import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import AppError from "../../errors/appError";

const deleteCommentsService = async (id: string, userId: string) => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const commentExists = await commentRepository.findOneBy({
    id,
  });

  if (!commentExists) {
    throw new AppError("Comment does not exists", 404);
  }

  if (commentExists!.user.id !== userId) {
    throw new AppError("Unauthorized user", 401);
  }

  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Comments)
    .where("id = :id", { id: id })
    .execute();

  return;
};

export default deleteCommentsService;
