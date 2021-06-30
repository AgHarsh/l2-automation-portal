import { Request, Response } from "express";
import { Any, getRepository } from "typeorm";
import { Server } from "../entity/Server";
import { ServerGrp } from "../entity/ServerGrp";
import { Service } from "../entity/Service";

export class DBController {
    
    static newServers = async (req: Request, res: Response) => {
        const serviceRepository = await getRepository(Service);
        const serverGrpRepository = await getRepository(ServerGrp);
        const serverRepository = await getRepository(Server);
        const services = Object.keys(req.body);
        for(const serviceName of services){
            let service;
            try{
                service = await serviceRepository.findOneOrFail({ where: {
                    serviceName: serviceName
                }});
            } catch(e){
                service = await serviceRepository.save({
                    serviceName: serviceName
                });
            }
            const serverGrps = Object.keys(req.body[serviceName]);
            for(let serverGrpName of serverGrps){
                let serverGrp;
                try{
                    serverGrp = await serverGrpRepository.findOneOrFail({ where: {
                        serverGrpName: serverGrpName,
                        serviceId: service.serviceId
                    }});
                } catch(e){
                    serverGrp = await serverGrpRepository.save({
                        serverGrpName: serverGrpName,
                        serviceId: service.serviceId
                    });
                }
                const servers = req.body[serviceName][serverGrpName];
                for(let serverName of servers){
                    const server = {
                        serverName: serverName,
                        serverGrpId: serverGrp.serverGrpId,
                        serviceId: service.serviceId
                    };
                    try {
                        await serverRepository.save(server);
                    } catch(error) {}
                }
            }
        }
        res.status(201).send();
    };

}