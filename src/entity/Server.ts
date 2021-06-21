import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { ServerGrp } from "./ServerGrp";
import { Script } from "./Script";

@Entity()
@Unique(["serverName"])
export class Server {

    @PrimaryGeneratedColumn()
    serverId: number;

    @Column({ type: "varchar", length: 50 })
    serverName: string;
    
    @Column()
    serverGrpName: string;
    @ManyToOne(() => ServerGrp, serverGrp => serverGrp.servers)
    @JoinColumn({ name: "serverGrpName", referencedColumnName: "serverGrpName" })
    serverGrp: ServerGrp;

    @OneToMany(() => Script, script => script.server)
    scripts: Script[];
}
