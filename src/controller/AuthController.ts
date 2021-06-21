import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import config from "../config/config";

export class AuthController {
    static login = async (req: Request, res: Response) => {
        if(!(req.body.email && req.body.password)){
            return res.status(400).send();
        }
            
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { 
                email: req.body.email 
            }});
        } catch(error) {
            return res.status(400).send("Invalid email or password!");
        }

        const validPassword = compareSync(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid email or password!");

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.jwtPrivateKey,{ expiresIn: '1h' });
        res.send(token);
    };
}
