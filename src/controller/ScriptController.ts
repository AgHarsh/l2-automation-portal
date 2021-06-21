import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Script } from "../entity/Script";

export class ScriptController {

    static listAll = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        res.send(await scriptRepository.find())
    };

    static getByServerAndAlert = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        try {
            let scripts = await scriptRepository.find({
                where: {
                    alertName: req.body.alertName,
                    serverName: req.body.serverName
                }
            });
            res.send(scripts);
            // await scriptRepository.remove(scripts);
        } catch (error) {
            res.status(401).send("ServerGrp or Alert Not Found");
        }
    };

    static getOneById = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        try {
            res.send(await scriptRepository.findOneOrFail(req.params.id));
        } catch (error) {
            res.status(404).send("Script Not Found");
        }
    };

    static newScript = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if (errors.length > 0) return res.status(400).send("Error!");

        const scriptRepository = getRepository(Script);
        try {
            await scriptRepository.save(req.body);
        } catch (error) {
            return res.status(409).send("Script already exists!");
        }

        res.status(201).send();
    };

    static newManyScript = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if (errors.length > 0) return res.status(400).send("Error!");

        const scriptRepository = getRepository(Script);
        try {
            let scripts = await scriptRepository.find({
                where: {
                    alertName: req.body.alertName,
                    serverName: req.body.serverName
                }
            });
            await scriptRepository.remove(scripts);
        } catch (error) {
        }

        req.body.scripts.forEach(async (scriptData) => {
            const script = {
                scriptFile: scriptData.script, alertName: req.body.alertName,
                serverName: req.body.serverName
            }
            try {
                await scriptRepository.save(script);
            } catch (error) {
                return res.status(409).send("Script already exists!");
            }
        })
        res.status(201).send();
    };

    static deleteScript = async (req: Request, res: Response) => {
        const scriptRepository = getRepository(Script);
        let script: Script;
        try {
            script = await scriptRepository.findOneOrFail(req.params.id);
        } catch (error) {
            return res.status(404).send("Script Not Found");
        }
        scriptRepository.remove(script);
        res.status(204).send();
    };

}
