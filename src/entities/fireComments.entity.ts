import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Comments from "./comments.entity";
import User from "./user.entity";

@Entity("fires_comments")
class FireComments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.fireComments)
  user: User;

  @ManyToOne(() => Comments, (comments) => comments.fires)
  comments: Comments;
}

export default FireComments;
