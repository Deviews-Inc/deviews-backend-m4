import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import FireComments from "./fireComments.entity";
import Posts from "./posts.entity";
import User from "./user.entity";

@Entity("comments")
class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(() => FireComments, (fires) => fires.user)
  fires: FireComments[];

  @ManyToOne(() => Posts, (posts) => posts.comments)
  post: Posts;
}
export default Comments;
