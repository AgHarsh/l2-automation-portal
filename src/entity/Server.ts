import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { ServerGrp } from "./ServerGrp";
import { Script } from "./Script";

@Entity()
@Unique(["serverName","serverGrpId"])
export class Server {

    @PrimaryGeneratedColumn()
    serverId: number;

    @Column({ type: "varchar", length: 50 })
    serverName: string;
    
    @Column()
    serverGrpId: number;
    @ManyToOne(() => ServerGrp, serverGrp => serverGrp.servers)
    @JoinColumn({ name: "serverGrpId", referencedColumnName: "serverGrpId" })
    serverGrp: ServerGrp;

    @Column()
    serviceId: number;

    @OneToMany(() => Script, script => script.server)
    scripts: Script[];
}
