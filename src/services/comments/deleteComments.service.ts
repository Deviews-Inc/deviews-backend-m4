import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import AppError from "../../errors/appError";

const deleteCommentsService = async (id: string, userId: string) => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const commentExists = await commentRepository.findOne({
    where: { id },
    relations: { user: true },
  });

  if (!commentExists) {
    throw new AppError("Comment not found", 404);
  }

  if (commentExists.user.id !== userId) {
    throw new AppError("You're not the owner of this post", 401);
  }

  await commentRepository.delete(id);

  return;
};

export default deleteCommentsService;
