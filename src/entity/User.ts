import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;
    
    @Column({ type: "varchar", length: 50, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt); 
    }
}