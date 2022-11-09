import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UsersTechs from "./usersTechs.entity";

@Entity("techs")
class Techs {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  tech_name: string;

  @OneToMany(() => UsersTechs, (usersTechs) => usersTechs.techs)
  usersTechs: UsersTechs[];
}

export default Techs;
