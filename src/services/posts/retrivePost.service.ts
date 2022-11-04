import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";
import AppError from "../../errors/appError";

const retrievePostService = async (id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const post = await postsRepository.find({
    relations: {
      user: true,
      fire_posts: {
        user: true,
      },
      comments: {
        fires: {
          user: true,
        },
      },
    },
    select: {
      user: {
        id: true,
        name: true,
        username: true,
        profile_picture: true,
      },
      fire_posts: {
        id: true,
        user: {
          id: true,
        },
      },
      comments: {
        fires: {
          id: true,
          user: {
            id: true,
            name: true,
            username: true,
            profile_picture: true,
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return post;
};

export default retrievePostService;
