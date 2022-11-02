import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import FireComments from "./fireComments.entity";
import Posts from "./posts.entity";
import User from "./user.entity";

@Entity("comments")
class Comments {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(() => FireComments, (fires) => fires.user)
  fireComments: FireComments[];

  @ManyToOne(() => Posts, (posts) => posts.comments)
  post: Posts;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
export default Comments;
