import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { ServerGrp } from "../entity/ServerGrp";
import { Service } from "../entity/Service";

export class ServerGrpController {

    static listAll = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        res.send(await serverGrpRepository.find())
    };

    static getByService = async (req: Request, res: Response) => {
        const serverGrpRepository = getRepository(ServerGrp);
        try {
            res.send(await serverGrpRepository.find({ where: {
                serviceName: req.body.serviceName
            }}));
        } catch(error) {
            res.status(401).send("Service Not Found");
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
            await serviceRepository.find({ where: {
                serviceName: req.body.serviceName
            }});
        } catch(error){
            return res.send(400).send("Service Not Found");
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
            await serviceRepository.find({ where: {
                serviceName: req.body.serviceName
            }});
        } catch(error){
            return res.send(400).send("Service Not Found");
        }
        
        serverGrp.serverGrpName = req.body.serverGrpName;
        serverGrp.service = req.body.service;
        const errors = await validate(serverGrp);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await serverGrpRepository.save(serverGrp);
        } catch(error) {
            return res.status(409).send("ServerGrp Name already in use");
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