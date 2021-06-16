import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ServerGrp } from "./ServerGrp";
import { Script } from "./Script";

@Entity()
export class Server {

    @PrimaryGeneratedColumn()
    serverId: number;

    @Column({ type: "varchar", length: 50 })
    serverName: string;
    
    @Column()
    serverGrpId: number;
    @ManyToOne(() => ServerGrp, serverGrp => serverGrp.servers)
    @JoinColumn({ name: "serverGrpId" })
    serverGrp: ServerGrp;

    @OneToMany(() => Script, script => script.server)
    scripts: Script[];
}
