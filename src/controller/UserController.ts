import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

export class UserController {

    static listAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        res.send(await userRepository.find({
            select: ["id", "name", "email", "isAdmin"]
        }));
    };

    static getOneById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userRepository = getRepository(User);
        try {
            res.send(await userRepository.findOneOrFail(id, {
                select: ["id", "name", "email", "isAdmin"]
            }));
        } catch(error) {
            res.status(404).send("User Not Found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
        const errors = await validate(req.body);
        if(errors.length > 0) return res.status(400).send("Error!");

        const userRepository = getRepository(User);
        let user = await userRepository.findOne({ where: {
            email: req.body.email
        }});
        if(user) return res.status(409).send("User already registered!");

        user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.hashPassword();
        try {
            await userRepository.save(user);
        } catch(error) {
            return res.status(400).send("Error Occured");
        }
        
        res.status(201).send("User Created!");
    };

    static editUser = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            return res.status(404).send("User Not Found");
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.isAdmin = req.body.isAdmin;
        const errors = await validate(user);
        if(errors.length > 0) return res.status(400).end("Error");
        try {
            await userRepository.save(user);
        } catch(error) {
            return res.status(409).send("Email already in use");
        }
        
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(req.params.id);
        } catch(error) {
            return res.status(404).send("User Not Found");
        }
        userRepository.remove(user);
        res.status(204).send();
    };

}