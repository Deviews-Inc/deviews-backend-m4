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

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => FirePosts, (fire) => fire.post, {
    cascade: true,
    eager: true,
  })
  fire_posts: FirePosts[];

  @OneToMany(() => Comments, (comments) => comments.post, {
    cascade: true,
    eager: true,
  })
  comments: Comments[];
}

export default Posts;
