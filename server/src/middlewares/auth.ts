import type { Request, Response, NextFunction } from "express";
import { getToken } from "../service/token";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "NOT_AUTHENTICATED",
        });
    }

    try {
        const decoded = getToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                code: 401,
                message: "INVALID_TOKEN",
            });
        }

       
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "TOKEN_EXPIRED",
        });
    }
};

export default auth;