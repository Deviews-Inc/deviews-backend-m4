import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("techs")
class Techs {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  tech_name: string;
}

export default Techs;
