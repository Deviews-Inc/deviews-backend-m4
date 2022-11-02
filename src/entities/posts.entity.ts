import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
class Posts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 140 })
  content: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  profilePicture: string;
}
