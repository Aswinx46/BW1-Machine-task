import { Request, Response } from "express";
import { LoginUserUseCase } from "../../../useCases/user/loginUserUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class LoginUserController {
    private loginUserUseCase: LoginUserUseCase
    constructor(loginUserUseCase: LoginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase
    }
    async handleUserLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            await this.loginUserUseCase.loginUser(email, password)
            res.status(HttpStatus.OK).json({ message: "User Logged In" })
        } catch (error) {
            console.log('error in userLogin controller while logining user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while user logining",
                error: error instanceof Error ? error.message : 'error while logining user'
            })
        }
    }
}