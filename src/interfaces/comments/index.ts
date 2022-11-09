import Comments from "../../entities/comments.entity";
import FirePosts from "../../entities/firePosts.entity";
import User from "../../entities/user.entity";

export interface IComment {
  content: string;
}

export interface ICommentsRequest {
  content: string;
  user: string;
  post: string;
}

export interface ICommentUpdate extends IComment {
  id: string;
  createdAt: Date;
  user: User;
  comments: Comments;
  firePosts: FirePosts;
  id_user: string;
  image?: string;
}
