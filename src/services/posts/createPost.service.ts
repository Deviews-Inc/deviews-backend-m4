import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { IPostRequest } from "../../interfaces/posts";

const createPostService = async (
  userId: string,
  { content, image }: IPostRequest
): Promise<Posts> => {
  const postRepository = AppDataSource.getRepository(Posts);
  const userRepository = AppDataSource.getRepository(User);

  if (!content && !image) {
    throw new AppError("Cannot make an empty post", 403);
  }

  if (content === "" && image === "") {
    throw new AppError("Cannot make an empty post", 403);
  }

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newPost = postRepository.create({
    content,
    image,
    user: user!,
  });

  await postRepository.save(newPost);

  const post = await postRepository.findOne({
    where: {
      id: newPost.id,
    },
    relations: {
      user: true,
      fire_posts: true,
      comments: true,
    },
  });

  return post!;
};

export default createPostService;
