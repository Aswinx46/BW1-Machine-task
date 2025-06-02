import { Request, Response } from "express";
import { LoginUserUseCase } from "../../../useCases/user/loginUserUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";
import { IjwtService } from "../../../domain/interface/serviceInterfaces/IjwtService";
import { setCookie } from "../../../framework/services/setCookie";

export class LoginUserController {
    private loginUserUseCase: LoginUserUseCase
    private jwtService: IjwtService
    constructor(loginUserUseCase: LoginUserUseCase, jwtService: IjwtService) {
        this.loginUserUseCase = loginUserUseCase
        this.jwtService = jwtService
    }
    async handleUserLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const user = await this.loginUserUseCase.loginUser(email, password)
            const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string
            const REFRESHTOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY as string
            const accessToken = this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, user._id?.toString() || '')
            const refreshToken = this.jwtService.createRefreshToken(REFRESHTOKEN_SECRET_KEY, user._id?.toString() || '')
            setCookie(res, refreshToken)
            res.status(HttpStatus.OK).json({ message: "User Logged In", user, accessToken })
        } catch (error) {
            console.log('error in userLogin controller while logining user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while user logining",
                error: error instanceof Error ? error.message : 'error while logining user'
            })
        }
    }
}