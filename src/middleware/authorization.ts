import { Request, Response, NextFunction } from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.jwtPayload.isAdmin) return res.status(403).send('Access Denied');
    next();
}