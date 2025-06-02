import { NextFunction, Request, Response } from "express";
import { IjwtService } from "../../domain/interface/serviceInterfaces/IjwtService";
import { HttpStatus } from "../../domain/entities/httpStatus";

export const tokenValidationMiddleware = (jwtService: IjwtService) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
            return
        }
        const token = authHeader.split(' ')[1]
        const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string

        try {
            // This should throw an error if invalid or expired
            const decoded = jwtService.verifyAccessToken(token, ACCESSTOKEN_SECRET_KEY);
            if (!decoded || decoded.exp <= 0) {
                res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ message: "Invalid or expired token." });
                return
            }
            console.log(decoded);
            // Optionally store decoded token info on the request object
            (req as any).user = decoded;

            next(); // proceed if token is valid
        } catch (error) {
            res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: "Invalid or expired token." });
        }
    }
}