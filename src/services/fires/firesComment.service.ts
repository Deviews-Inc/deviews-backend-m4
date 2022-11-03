import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import FireComments from "../../entities/fireComments.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const firesCommentService = async (idComment: string, idUser: string) => {
  const firesCommentRepository = AppDataSource.getRepository(FireComments);
  const commentsRepository = AppDataSource.getRepository(Comments);
  const usersRepository = AppDataSource.getRepository(User);

  const comment = await commentsRepository.findOneBy({
    id: idComment,
  });

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  const user = await usersRepository.findOneBy({
    id: idUser,
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const verifyFireComment = await firesCommentRepository.findOneBy({
    comments: comment,
    user: user,
  });

  if (verifyFireComment) {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(FireComments)
      .where("id = id:id", { id: verifyFireComment.id })
      .execute();

    return "Desfire";
  }

  const fire = firesCommentRepository.create({
    comments: comment,
    user: user,
  });

  await firesCommentRepository.save(fire);

  return "Fire";
};

export default firesCommentService;
