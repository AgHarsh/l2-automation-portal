import {getRepository} from "typeorm";
import { Request } from "express";
import {ServerGrp} from "../entity/ServerGrp";

export class ServerGrpController {

    private serverGrpRepository = getRepository(ServerGrp);

    async all() {
        return this.serverGrpRepository.find();
    }

    async one(req: Request) {
        return this.serverGrpRepository.findOne(req.params.id);
    }

    async save(req: Request) {
        return this.serverGrpRepository.save(req.body);
    }

    async remove(req: Request) {
        let serverGrpToRemove = await this.serverGrpRepository.findOne(req.params.id);
        await this.serverGrpRepository.remove(serverGrpToRemove);
    }

    async byForeign(req: Request) {
        return this.serverGrpRepository.find({ where: {serviceId: req.params.serviceId}});
    }

}