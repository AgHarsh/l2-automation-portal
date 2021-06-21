import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Server } from "../entity/Server";
import { ServerGrp } from "../entity/ServerGrp";

export class ServerController {

    static listAll = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        res.send(await serverRepository.find())
    };

    static getByServGrp = async (req: Request, res: Response) => {
        const serverRepository = getRepository(Server);
        try {
            res.send(await serverRepository.find({ where: {
                serverGrpName: req.body.serverGrpName
            }}));
        } catch(error) {
            res.status(401).send("ServerGrp Not Found");
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
        try {
            await serverGrpRepository.find({ where: {
                serverGrpName: req.body.serverGrpName
            }});
        } catch(error){
            return res.send(400).send("ServerGrp Not Found");
        }
        
        try {
            await serverRepository.save(req.body);
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

        try {
            await serverGrpRepository.find({ where: {
                serverGrpName: req.body.serverGrpName
            }});
        } catch(error){
            return res.send(400).send("ServerGrp Not Found");
        }
        
        server.serverName = req.body.serverName;
        server.serverGrpName = req.body.serverGrpName;
        const errors = await validate(server);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await serverRepository.save(server);
        } catch(error) {
            return res.status(409).send("Server Name already in use");
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