import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Alert } from "./Alert";
import { Server } from "./Server";

@Entity()
@Unique(["alertName", "serverName", "scriptFile"])
export class Script {

    @PrimaryGeneratedColumn()
    scriptId: number;

    @Column({ type: "varchar", length: 255 })
    scriptFile: string;
    
    @Column()
    alertName: string;
    @ManyToOne(() => Alert, alert => alert.scripts)
    @JoinColumn({ name: "alertName", referencedColumnName: "alertName" })
    alert: Alert;

    @Column()
    serverName: string;
    @ManyToOne(() => Server, server => server.scripts)
    @JoinColumn({ name: "serverName", referencedColumnName: "serverName" })
    server: Server;

}
