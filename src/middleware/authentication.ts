import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config.jwtPrivateKey);
        res.locals.jwtPayload = jwtPayload;
    } catch(error) {
        return res.status(401).send('Access denied');
    }
    
    // Token is valid only for 1 hour
    const { userId, isAdmin } = jwtPayload;
    const newToken = jwt.sign({ userId, isAdmin }, config.jwtPrivateKey, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    next();
}