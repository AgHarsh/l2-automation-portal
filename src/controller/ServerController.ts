import {getRepository} from "typeorm";
import { Request } from "express";
import {Server} from "../entity/Server";

export class ServerController {

    private serverRepository = getRepository(Server);

    async all() {
        return this.serverRepository.find();
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

    async byForeign(req: Request) {
        return this.serverRepository.find({ where: {serverGrpId: req.params.serverGrpId}});
    }

}