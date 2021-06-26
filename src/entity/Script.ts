import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Alert } from "./Alert";
import { Server } from "./Server";

@Entity()
@Unique(["alertId", "serverId", "scriptFile"])
export class Script {

    @PrimaryGeneratedColumn()
    scriptId: number;

    @Column({ type: "varchar", length: 255 })
    scriptFile: string;
    
    @Column()
    alertId: number;
    @ManyToOne(() => Alert, alert => alert.scripts)
    @JoinColumn({ name: "alertId", referencedColumnName: "alertId" })
    alert: Alert;

    @Column()
    serverId: number;
    @ManyToOne(() => Server, server => server.scripts)
    @JoinColumn({ name: "serverId", referencedColumnName: "serverId" })
    server: Server;

}
