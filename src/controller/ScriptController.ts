import {getRepository} from "typeorm";
import { Request } from "express";
import {Script} from "../entity/Script";

export class ScriptController {

    private scriptRepository = getRepository(Script);

    async all() {
        return this.scriptRepository.find();
    }

    async one(req: Request) {
        return this.scriptRepository.findOne(req.params.id);
    }

    async save(req: Request) {
        return this.scriptRepository.save(req.body);
    }

    async remove(req: Request) {
        let scriptToRemove = await this.scriptRepository.findOne(req.params.id);
        await this.scriptRepository.remove(scriptToRemove);
    }

    async byForeign(req: Request) {
        return this.scriptRepository.find({ where: {
            alertId: req.params.alertId, 
            serverId: req.params.serverId
        } });
    }

}