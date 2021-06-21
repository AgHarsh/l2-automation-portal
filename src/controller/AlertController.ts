import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Alert } from "../entity/Alert";

export class AlertController {

    static listAll = async (req: Request, res: Response) => {
        const alertRepository = getRepository(Alert);
        res.send(await alertRepository.find());
    };

    static getOneById = async (req: Request, res: Response) => {
        const alertRepository = getRepository(Alert);
        try {
            res.send(await alertRepository.findOneOrFail(req.params.id));
        } catch(error) {
            res.status(404).send("Alert Not Found");
        }
    };
    
    static newAlert = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const alertRepository = getRepository(Alert);
        try {
            await alertRepository.save(req.body);
        } catch(error) {
            return res.status(409).send("Alert already exists!");
        }
        
        res.status(201).send();
    };

    static editAlert = async (req: Request, res: Response) => {
        const alertRepository = getRepository(Alert);
        let alert: Alert;
        try {
            alert = await alertRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Alert Not Found");
        }

        alert.alertName = req.body.alertName;
        const errors = await validate(alert);
        if(errors.length > 0) return res.status(400).end("Error");

        try {
            await alertRepository.save(alert);
        } catch(error) {
            return res.status(409).send("Alert Name already in use");
        }
        
        res.status(204).send();
    };
    
    static deleteAlert = async (req: Request, res: Response) => {
        const alertRepository = getRepository(Alert);
        let alert: Alert;
        try {
            alert = await alertRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Alert Not Found");
        }
        alertRepository.remove(alert);
        res.status(204).send();
    };
    
}