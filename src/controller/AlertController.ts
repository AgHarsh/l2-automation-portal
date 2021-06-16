import {getRepository} from "typeorm";
import { Request } from "express";
import {Alert} from "../entity/Alert";

export class AlertController {

    private alertRepository = getRepository(Alert);

    async all() {
        return this.alertRepository.find();
    }

    async one(req: Request) {
        return this.alertRepository.findOne(req.params.id);
    }

    async save(req: Request) {
        return this.alertRepository.save(req.body);
    }

    async remove(req: Request) {
        let alertToRemove = await this.alertRepository.findOne(req.params.id);
        await this.alertRepository.remove(alertToRemove);
    }

}