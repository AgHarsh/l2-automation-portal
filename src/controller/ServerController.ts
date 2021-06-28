import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Server } from "../entity/Server";
import { ServerGrp } from "../entity/ServerGrp";

export class ServerController {

    static getServers = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        if(!req.query.servergrp){
            if(!res.locals.jwtPayload.isAdmin) 
                return res.status(403).send('Access Denied');
            return res.send(await serverRepository.find());
        }
        try {
            res.send(await serverRepository.find({ where: {
                serverGrpId: req.query.servergrp
            }}));
        } catch(error) {
            res.status(401).send("Servers With Given ServerGrps Not Found!");
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        try {
            res.send(await serverRepository.findOneOrFail(req.params.id));
        } catch(error) {
            res.status(404).send("Server Not Found");
        }
    };
    
    static newServer = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const serverRepository = getRepository(Server);
        const serverGrpRepository = getRepository(ServerGrp);
        let serverGrp;
        try {
            serverGrp = await serverGrpRepository.findOneOrFail({ where: {
                serverGrpId: req.body.serverGrpId
            }, select: ["serviceId"]});
        } catch(error){
            return res.status(400).send("ServerGrp Not Found");
        }
        const server = new Server();
        server.serverName = req.body.serverName;
        server.serverGrpId = req.body.serverGrpId;
        server.serviceId = serverGrp.serviceId;
        try {
            await serverRepository.save(server);
        } catch(error) {
            return res.status(409).send("Server already exists!");
        }
        
        res.status(201).send();
    };
    
    static editServer = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        const serverGrpRepository = getRepository(ServerGrp);
        let server: Server;
        try {
            server = await serverRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Server Not Found");
        }
        let serverGrp;
        try {
            serverGrp = await serverGrpRepository.findOneOrFail({ where: {
                serverGrpId: req.body.serverGrpId
            }});
        } catch(error){
            return res.status(400).send("ServerGrp Not Found");
        }
        
        server.serverName = req.body.serverName;
        server.serverGrpId = req.body.serverGrpId;
        server.serviceId = serverGrp.serviceId;
        const errors = await validate(server);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await serverRepository.save(server);
        } catch(error) {
            return res.status(409).send(error.message);
        }
        
        res.status(204).send();
    };
    
    static deleteServer = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        let server: Server;
        try {
            server = await serverRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Server Not Found");
        }
        serverRepository.remove(server);
        res.status(204).send();
    };
    
}