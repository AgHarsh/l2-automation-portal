import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ServerGrp } from './ServerGrp';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    serviceId: number

    @Column({ type: "varchar", length: 50 })
    serviceName: string

    @OneToMany(() => ServerGrp, serverGrp => serverGrp.service)
    serverGrps: ServerGrp[];
}
