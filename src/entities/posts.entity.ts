import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Comments from "./comments.entity";
import FirePosts from "./firePosts.entity";
import User from "./user.entity";

@Entity("posts")
class Posts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 140 })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => FirePosts, (fire) => fire.posts)
  firePosts: FirePosts[];

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];
}

export default Posts;
