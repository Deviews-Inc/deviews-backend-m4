import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { ICommentUpdate } from "../../interfaces/comments";

const updateCommentsService = async (
  id: string,
  userId: string,
  data: ICommentUpdate
): Promise<Comments> => {
  const commentRepository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User);

  const keys = Object.keys(data);

  const { content } = data;

  const user = await userRepository.findOneBy({ id: userId });

  const comment = await commentRepository.findOne({
    where: { id },
    relations: { user: true },
  });

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (comment.user.id !== userId) {
    throw new AppError("Not allowed to update", 403);
  }

  if (
    keys.includes("user_id") ||
    keys.includes("post_id") ||
    keys.includes("id")
  ) {
    throw new AppError("Cannot update this value", 401);
  }

  await commentRepository.update(id, {
    content,
  });

  const updatedComment = await commentRepository.findOneBy({ id });

  return updatedComment!;
};
export default updateCommentsService;
