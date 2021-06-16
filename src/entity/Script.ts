import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Alert } from "./Alert";
import { Server } from "./Server";

@Entity()
export class Script {

    @PrimaryGeneratedColumn()
    scriptId: number;

    @Column({ type: "varchar", length: 255 })
    scriptFile: string;
    
    @PrimaryColumn()
    alertId: number;
    @ManyToOne(() => Alert, alert => alert.scripts)
    @JoinColumn({ name: "alertId" })
    alert: Alert;

    @PrimaryColumn()
    serverId: number;
    @ManyToOne(() => Server, server => server.scripts)
    @JoinColumn({ name: "serverId" })
    server: Server;
}
