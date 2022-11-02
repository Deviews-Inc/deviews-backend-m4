import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"

@Entity("comments")
class Comments{
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    content: string

    constructor(){
        if(!this.id){
            this.id = uuidv4()
        }
    }
}