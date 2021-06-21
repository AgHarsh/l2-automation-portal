import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');
    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch(error) {
        res.status(400).send('Invalid token');
    }
}