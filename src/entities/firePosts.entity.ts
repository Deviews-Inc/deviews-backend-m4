import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Posts from "./posts.entity";
import User from "./user.entity";

@Entity("fires_posts")
class FirePosts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.firePosts)
  user: User;

  @ManyToOne(() => Posts, (posts) => posts.firePosts)
  posts: Posts[];
}

export default FirePosts;
