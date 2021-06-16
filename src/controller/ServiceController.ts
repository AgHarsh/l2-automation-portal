import {getRepository} from "typeorm";
import { Request } from "express";
import {Service} from "../entity/Service";

export class ServiceController {

    private serviceRepository = getRepository(Service);

    async all() {
        return this.serviceRepository.find();
    }

    async one(req: Request) {
        return this.serviceRepository.findOne(req.params.id);
    }

    async save(req: Request) {
        return this.serviceRepository.save(req.body);
    }

    async remove(req: Request) {
        let serviceToRemove = await this.serviceRepository.findOne(req.params.id);
        await this.serviceRepository.remove(serviceToRemove);
    }

}