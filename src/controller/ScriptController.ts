import {getRepository} from "typeorm";
import { Request } from "express";
import {Script} from "../entity/Script";

export class ScriptController {

    private scriptRepository = getRepository(Script);

    async all(req: Request) {
        if(req.query.serverId === undefined || req.query.alertId === undefined)
            return this.scriptRepository.find();
        return this.scriptRepository.find({ where: {
            alertId: req.query.alertId, 
            serverId: req.query.serverId
        }});
    }

    async one(req: Request) {
        return this.scriptRepository.find( { where: {
            scriptId: req.params.id
        }});
    }

    async save(req: Request) {
        return this.scriptRepository.save(req.body);
    }

    async remove(req: Request) {
        let scriptToRemove = await this.scriptRepository.findOne(req.params.id);
        await this.scriptRepository.remove(scriptToRemove);
    }

}