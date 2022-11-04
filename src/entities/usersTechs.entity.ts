import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Techs from "./techs.entity";
import User from "./user.entity";

@Entity("users_techs")
class UsersTechs {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Techs)
  techs: Techs;
}

export default UsersTechs;
