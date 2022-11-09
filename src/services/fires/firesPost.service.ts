import AppDataSource from "../../data-source";
import FirePosts from "../../entities/firePosts.entity";
import Posts from "../../entities/posts.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";

const firesPostService = async (
  idPost: string,
  idUser: string
): Promise<string> => {
  const firesPostRepository = AppDataSource.getRepository(FirePosts);
  const postsRepository = AppDataSource.getRepository(Posts);
  const usersRepository = AppDataSource.getRepository(User);

  const post = await postsRepository.findOneBy({
    id: idPost,
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const user = await usersRepository.findOneBy({
    id: idUser,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const fires = await firesPostRepository.find({
    relations: {
      user: true,
      post: true,
    },
  });

  const verifyFirePost = fires.find(
    (elem) => elem.post.id === idPost && elem.user.id === idUser
  );

  if (verifyFirePost) {
    await firesPostRepository.delete(verifyFirePost.id);

    return "Desfire";
  }

  const fire = firesPostRepository.create({
    post: post,
    user: user,
  });

  await firesPostRepository.save(fire);

  return "Fire";
};

export default firesPostService;
