import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import Techs from "./techs.entity";
import Posts from "./posts.entity";
import Comments from "./comments.entity";
import FirePosts from "./firePosts.entity";
import FireComments from "./fireComments.entity";
import UsersTechs from "./usersTechs.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column()
  bio: string;

  @Column()
  profile_picture: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UsersTechs, (UsersTechs) => UsersTechs.user)
  usersTechs: UsersTechs[];

  @OneToMany(() => Posts, (posts) => posts.user, {
    cascade: true,
  })
  posts: Posts[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => FirePosts, (fires) => fires.user, {
    cascade: true,
  })
  fire_posts: FirePosts[];

  @OneToMany(() => FireComments, (fires) => fires.user)
  fire_comments: FireComments[];
}

export default User;
