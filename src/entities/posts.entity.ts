import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
class Posts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 140 })
  content: string;
}

export default Posts;
