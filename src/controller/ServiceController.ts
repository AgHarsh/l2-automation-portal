import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Service } from "../entity/Service";

export class ServiceController {

    static listAll = async (req: Request, res: Response) => {
        const serviceRepository = getRepository(Service);
        res.send(await serviceRepository.find());
    };

    static getOneById = async (req: Request, res: Response) => {
        const serviceRepository = getRepository(Service);
        try {
            res.send(await serviceRepository.findOneOrFail(req.params.id));
        } catch(error) {
            res.status(404).send("Service Not Found");
        }
    };
    
    static newService = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const serviceRepository = getRepository(Service);
        try {
            await serviceRepository.save(req.body);
        } catch(error) {
            return res.status(409).send("Service already exists!");
        }
        
        res.status(201).send();
    };

    static editService = async (req: Request, res: Response) => {
        const serviceRepository = getRepository(Service);
        let service: Service;
        try {
            service = await serviceRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Service Not Found");
        }

        service.serviceName = req.body.serviceName;
        const errors = await validate(service);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await serviceRepository.save(service);
        } catch(error) {
            return res.status(409).send("Service Name already in use");
        }
        
        res.status(204).send();
    };
    
    static deleteService = async (req: Request, res: Response) => {
        const serviceRepository = getRepository(Service);
        let service: Service;
        try {
            service = await serviceRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Service Not Found");
        }
        serviceRepository.remove(service);
        res.status(204).send();
    };

}