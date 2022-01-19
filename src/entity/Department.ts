import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Audio } from "./Audio";

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {
        type: "varchar",
        length: 255,
        unique: true
    } )
    name_uz: string;

    @Column( {
        type: "text",
        select: false,
        default: null
        //length: 255,
    } )
    description: string;

    @OneToMany( type => Audio, audio => audio.department ) audio: Audio[];

}
