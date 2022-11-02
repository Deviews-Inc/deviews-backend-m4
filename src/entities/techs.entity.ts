import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("techs")
class Techs {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  tech_name: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default Techs;
