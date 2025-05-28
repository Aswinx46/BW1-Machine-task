import { Request, Response, Router } from "express";
import { injectedCreateUserController, injectedUserLoginController } from "../DI/userDI";

export class UserRoute {
    public userRoute: Router
    constructor() {
        this.userRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.userRoute.post('/register', (req: Request, res: Response) => {
            injectedCreateUserController.handleCreateUser(req, res)
        })
        this.userRoute.post('/login', (req: Request, res: Response) => {
            injectedUserLoginController.handleUserLogin(req, res)
        })
    }
}