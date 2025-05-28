import { Request, Response } from "express";
import { IverifyOtpUseCase } from "../../../domain/interface/useCaseInterface/user/verifyOtpUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class VerifyOtpUserController {
    private verifyOtpUserController: IverifyOtpUseCase
    constructor(verifyOtpUserController: IverifyOtpUseCase) {
        this.verifyOtpUserController = verifyOtpUserController
    }
    async handleVerifyOtpUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body
            await this.verifyOtpUserController.verifyOtp(email, otp)
            res.status(HttpStatus.OK).json({message:"OTP Verified Please Login "})
        } catch (error) {
            console.log('error while verifying otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while verifying otp',
                error: error instanceof Error ? error.message : 'error while verifying otp'
            })
        }
    }
}