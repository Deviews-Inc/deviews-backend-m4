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
  profilePicture: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Techs)
  @JoinTable()
  techs: Techs[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => FirePosts, (fires) => fires.user)
  firePosts: FirePosts[];

  @OneToMany(() => FireComments, (fires) => fires.user)
  fireComments: FireComments[];
}

export default User;
