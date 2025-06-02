import { Request, Response } from "express";
import { IuserLogoutUseCase } from "../../../domain/interface/useCaseInterface/user/userLogoutUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class UserLogoutController {
    private userLogoutUseCase: IuserLogoutUseCase
    constructor(userLogoutUseCase: IuserLogoutUseCase) {
        this.userLogoutUseCase = userLogoutUseCase
    }
    async handleUserLogout(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                return;
            }
            const token = authHeader.split(' ')[1];
            await this.userLogoutUseCase.logout(token)
            res.status(HttpStatus.OK).json({ message: "Logout successful" });
        } catch (error) {
            console.log('error while user logout', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while user logout",
                error: error instanceof Error ? error.message : 'error while user logout'
            })
        }
    }
}