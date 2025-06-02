import { Request, Response } from "express";
import { IsendOtpUseCase } from "../../../domain/interface/useCaseInterface/user/sendOtpUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class SendOtpUserController {
    private sendOtpUseCase: IsendOtpUseCase
    constructor(sendOtpUseCase: IsendOtpUseCase) {
        this.sendOtpUseCase = sendOtpUseCase
    }
    async handleSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            await this.sendOtpUseCase.sendOtp(email)
            res.status(HttpStatus.OK).json({
                message: "OTP Sended"
            })
        } catch (error) {
            console.log('error while sending otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while sending otp',
                error: error instanceof Error ? error.message : 'error while sending otp'
            })
        }
    }
}