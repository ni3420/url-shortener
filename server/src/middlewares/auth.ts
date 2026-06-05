import type { Request, Response, NextFunction } from "express";
import { getToken } from "../service/token";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "NOT_AUTHENTICATED",
        });
    }

    try {
        const decoded = getToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "INVALID_TOKEN",
            });
        };

    

        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "TOKEN_EXPIRED",
        });
    }
};

export default auth;