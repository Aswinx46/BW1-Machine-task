import { Request, Response, Router } from "express";
import { injectedCreateUserController, injectedSendOtpController, injectedUserLoginController, injectedVerifyOtpUseCase } from "../DI/userDI";

export class UserRoute {
    public userRoute: Router
    constructor() {
        this.userRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.userRoute.post('/createUser', (req: Request, res: Response) => {
            injectedCreateUserController.handleCreateUser(req, res)
        })
        this.userRoute.post('/login', (req: Request, res: Response) => {
            injectedUserLoginController.handleUserLogin(req, res)
        })
        this.userRoute.post('/sendOtp', (req: Request, res: Response) => {
            injectedSendOtpController.handleSendOtp(req, res)
        })
        this.userRoute.post('/verifyOtp', (req: Request, res: Response) => {
            injectedVerifyOtpUseCase.handleVerifyOtpUser(req, res)
        })
    }
}