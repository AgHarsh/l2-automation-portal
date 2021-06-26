import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Service } from "./Service";
import { Server } from "./Server";

@Entity()
@Unique(["serverGrpName", "serviceId"])
export class ServerGrp {

    @PrimaryGeneratedColumn()
    serverGrpId: number;

    @Column({ type: "varchar", length: 50 })
    serverGrpName: string;
    
    @Column()
    serviceId: number;
    @ManyToOne(() => Service, service => service.serverGrps)
    @JoinColumn({ name: "serviceId", referencedColumnName: 'serviceId' })
    service: Service;

    @OneToMany(() => Server, server => server.serverGrp)
    servers: Server[];
}
