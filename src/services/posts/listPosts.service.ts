import AppDataSource from "../../data-source";
import Posts from "../../entities/posts.entity";

const listPostsService = async () => {
  const postsRepository = AppDataSource.getRepository(Posts);

  const posts = await postsRepository.find({
    relations: {
      user: true,
      fire_posts: {
        user: true,
      },
      comments: true,
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
        id: true,
        user: {
          id: true,
          name: true,
          username: true,
          profile_picture: true,
        },
      },
    },
  });

  return posts;
};

export default listPostsService;
