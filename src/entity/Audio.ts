import {Column, Entity,  ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import { Department } from "./Department";

@Entity()
export class Audio {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Department, department => department.audio )
    department: Department; 

    @Column( {
        type: "varchar",
        length: 255,
    } )
    url: string;

    @Column( {
        type: "varchar",
        length: 255,
    } )
    title: string;

    @Column( {
        type: "text",
        select: false,
        default: null
        //length: 255,
    } )
    description: string;
}
