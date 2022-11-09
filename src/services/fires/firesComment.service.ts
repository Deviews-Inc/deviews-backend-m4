import AppDataSource from "../../data-source";
import Comments from "../../entities/comments.entity";
import FireComments from "../../entities/fireComments.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const firesCommentService = async (
  idComment: string,
  idUser: string
): Promise<string> => {
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
    throw new AppError("User not found", 404);
  }

  const fires = await firesCommentRepository.find({
    relations: {
      user: true,
      comments: true,
    },
  });

  const verifyFireComment = fires.find(
    (elem) => elem.comments.id === idComment && elem.user.id === idUser
  );

  if (verifyFireComment) {
    await firesCommentRepository.delete(verifyFireComment.id);

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
