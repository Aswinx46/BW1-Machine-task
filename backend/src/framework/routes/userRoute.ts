import { Request, Response, Router } from "express";
import { injectedCreateUserController, injectedRefreshTokenController, injectedSendOtpController, injectedUpdateKycController, injectedUserLoginController, injectedUserLogoutController, injectedVerifyOtpUseCase } from "../DI/userDI";
import { injectedTokenMiddleware } from "../DI/middlewareDI";

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
        this.userRoute.post('/updateKyc', injectedTokenMiddleware, (req: Request, res: Response) => {
            injectedUpdateKycController.handleUpdateKyc(req, res)
        })
        this.userRoute.post('/logout', injectedTokenMiddleware, (req: Request, res: Response) => {
            injectedUserLogoutController.handleUserLogout(req, res)
        })
        this.userRoute.post('/refreshToken',  (req: Request, res: Response) => {
            injectedRefreshTokenController.handleRefreshToken(req, res)
        })
    }
}