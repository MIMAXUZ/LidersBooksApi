import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn} from "typeorm";
import bcrypt from 'bcrypt'
import { PasswordEncryption } from "./../app/utils/Index";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {
        type: "varchar",
        length: 60,
    } )
    last_name: string;

    @Column( {
        type: "varchar",
        length: 60,
        default: ""
    } )
    first_name: string;

    @Column( {
        type: "varchar",
        length: 60,
        default: ""
    } )
    middle_name: string;

    @Column( {
        type: "varchar",
        length: 60,
        unique: true,
        select: false,
        default: null
    } )
    phone: string;

    @Column( {
        type: "varchar",
        default: "Guest", //If you want give admin role for each user, just change "Guest" to "Admin"
        select: false
    } )
    role: string;

    @Column( {
        type: "varchar",
        length: 100,
        unique: true,
        default: null,
        select: false,
    } )
    email: string;

    @Column( {
        type: "varchar",
        default: "Male", //If you want give admin role for each user, just change "Guest" to "Admin"
        select: false
    } )
    gender: string;

    @Column( {
        default: true,
        select: false
    } )
    confirmed: Boolean;

    @Column( {
        default: true,
        select: false
    } )
    is_blocked: Boolean;

    @CreateDateColumn( {
        type: 'timestamp',
        select: false
    } )
    created_at: Date;

    @UpdateDateColumn( {
        type: 'timestamp',
        select: false
    } )
    updated_at: Date;

    @Column( {
        type: "varchar",
        select: false
    } )
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword (): Promise<void> {
        if ( this.password ) {
            this.password = await PasswordEncryption( this.password );
        }
    }

    checkUserPasswordCrypt ( onencryptedPassword: string ) {
        return bcrypt.compareSync( onencryptedPassword, this.password );
    }
}
