import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { ServerGrp } from "../entity/ServerGrp";
import { Service } from "../entity/Service";

export class ServerGrpController {

    static getServerGrps = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        if(!req.query.service){
            if(!req.user.isAdmin) 
                return res.status(403).send('Access Denied');
            return res.send(await serverGrpRepository.find());
        }
        try {
            res.send(await serverGrpRepository.find({ where: {
                serviceId: req.query.service
            }}));
        } catch(error) {
            res.status(401).send("ServerGrp With Given Service Not Found!");
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        try {
            res.send(await serverGrpRepository.findOneOrFail(req.params.id));
        } catch(error) {
            res.status(404).send("ServerGrp Not Found");
        }
    };
    
    static newServGrp = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const serverGrpRepository = getRepository(ServerGrp);
        const serviceRepository = getRepository(Service);
        try {
            await serviceRepository.findOneOrFail({ where: {
                serviceId: req.body.serviceId
            }});
        } catch(error){
            return res.status(400).send("Service Not Found");
        }
        
        try {
            await serverGrpRepository.save(req.body);
        } catch(error) {
            return res.status(409).send("ServerGrp already exists!");
        }
        
        res.status(201).send();
    };
    
    static editServGrp = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        const serviceRepository = getRepository(Service);
        let serverGrp: ServerGrp;
        try {
            serverGrp = await serverGrpRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("ServerGrp Not Found");
        }

        try {
            await serviceRepository.findOneOrFail({ where: {
                serviceId: req.body.serviceId
            }});
        } catch(error){
            return res.status(400).send("Service Not Found");
        }
        
        serverGrp.serverGrpName = req.body.serverGrpName;
        serverGrp.serviceId = req.body.serviceId;
        const errors = await validate(serverGrp);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await serverGrpRepository.save(serverGrp);
        } catch(error) {
            return res.status(409).send(error.message);
        }
        
        res.status(204).send();
    };
    
    static deleteServGrp = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        let serverGrp: ServerGrp;
        try {
            serverGrp = await serverGrpRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("ServerGrp Not Found");
        }
        serverGrpRepository.remove(serverGrp);
        res.status(204).send();
    };
    
}