import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { ServerGrp } from './ServerGrp';
import { Server } from './Server';

@Entity()
@Unique(["serviceName"])
export class Service {

    @PrimaryGeneratedColumn()
    serviceId: number

    @Column({ type: "varchar", length: 50 })
    serviceName: string

    @OneToMany(() => ServerGrp, serverGrp => serverGrp.service)
    serverGrps: ServerGrp[];

}
