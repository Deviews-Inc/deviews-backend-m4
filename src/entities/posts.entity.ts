import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import Comments from "./comments.entity";
import FirePosts from "./firePosts.entity";
import User from "./user.entity";

@Entity("posts")
class Posts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 140 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true
  })
  user: User;

  @OneToMany(() => FirePosts, (fire) => fire.post)
  firePosts: FirePosts[];

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];
}

export default Posts;
