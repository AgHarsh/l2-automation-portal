import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Service } from "./Service";
import { Server } from "./Server";

@Entity()
@Unique(["serverGrpName"])
export class ServerGrp {

    @PrimaryGeneratedColumn()
    serverGrpId: number;

    @Column({ type: "varchar", length: 50 })
    serverGrpName: string;
    
    @Column()
    serviceName: string;
    @ManyToOne(() => Service, service => service.serverGrps)
    @JoinColumn({ name: "serviceName", referencedColumnName: 'serviceName' })
    service: Service;

    @OneToMany(() => Server, server => server.serverGrp)
    servers: Server[];
}
