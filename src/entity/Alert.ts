import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Script } from './Script';

@Entity()
@Unique(["alertName"])
export class Alert {

    @PrimaryGeneratedColumn()
    alertId: number

    @Column({ type: "varchar", length: 50 })
    alertName: string

    @OneToMany(() => Script, script => script.server)
    scripts: Script[];
}
