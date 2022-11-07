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
        user: true,
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
        usersTechs: false,
      },
      fire_posts: {
        id: true,
        user: {
          id: true,
        },
      },
      comments: {
        user: {
          id: true,
          name: true,
          username: true,
          profile_picture: true,
        },
        fires: {
          id: true,
          user: {
            id: true,
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
