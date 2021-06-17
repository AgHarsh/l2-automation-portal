import {getRepository} from "typeorm";
import { Request } from "express";
import {Server} from "../entity/Server";

export class ServerController {

    private serverRepository = getRepository(Server);

    async all(req: Request) {
        if(req.query.serverGrpId === undefined)
            return this.serverRepository.find();
        return this.serverRepository.find({ where: {
            serverGrpId: req.query.serverGrpId
        }});
    }

    async one(req: Request) {
        return this.serverRepository.findOne(req.params.id);
    }

    async save(req: Request) {
        return this.serverRepository.save(req.body);
    }

    async remove(req: Request) {
        let serverToRemove = await this.serverRepository.findOne(req.params.id);
        await this.serverRepository.remove(serverToRemove);
    }

}