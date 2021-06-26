import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Service } from "../entity/Service";
import { Server } from "../entity/Server";
import { Alert } from "../entity/Alert";
import { Script } from "../entity/Script";

export class ScriptController {

    static getScripts = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        if(!req.query.alert){
            if(!req.user.isAdmin) 
                return res.status(403).send('Access Denied');
            return res.send(await scriptRepository.find())
        } 
        try {
            if(req.query.service){
                const alert = await getRepository(Alert).findOneOrFail({ where: {
                    alertName: req.query.alert
                }, select: ["alertId"]});
                const service = await getRepository(Service).findOneOrFail({ where: {
                    serviceName: req.query.service
                }, select: ["serviceId"]});
                const server = await getRepository(Server).findOneOrFail({ where: {
                    serverName: req.query.server,
                    serviceId: service.serviceId
                }, select: ["serverId"]});
                res.send(await scriptRepository.find({ where: {
                    alertId: alert.alertId, 
                    serverId: server.serverId
                }}));
            }
            else{
                res.send(await scriptRepository.find({ where: {
                    alertId: req.query.alert, 
                    serverId: req.query.server
                }}));
            }
        } catch(error) {
            res.status(401).send("No such Scripts Found!");
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        try {
            res.send(await scriptRepository.findOneOrFail(req.params.id));
        } catch(error) {
            res.status(404).send("Script Not Found");
        }
    };

    static newScript = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const scriptRepository = getRepository(Script);
        try {
            let scripts = await scriptRepository.find({ where: {
                alertId: req.body.alertId, 
                serverId: req.body.serverId
            }});
            if(scripts) await scriptRepository.remove(scripts);
        } catch(error) {
            return res.status(401).send(error.message);
        }

        const scripts = req.body.scripts;
        for(let i=0;i<scripts.length;i++){
            if(scripts[i].script){
                const script = {
                    scriptFile: scripts[i].script,
                    alertId: req.body.alertId,
                    serverId: req.body.serverId
                };
                try {
                    await scriptRepository.save(script);
                } catch(error) {
                    return res.status(409).send(error.message);
                }
            }
            res.status(201).send();
            }
            
    };
    
    static deleteScript = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        let script: Script;
        try {
            script = await scriptRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("Script Not Found");
        }
        scriptRepository.remove(script);
        res.status(204).send();
    };
    
}