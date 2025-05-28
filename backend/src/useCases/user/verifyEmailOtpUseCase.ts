import { IotpService } from "../../domain/interface/serviceInterfaces/IotpService";
import { IverifyOtpUseCase } from "../../domain/interface/useCaseInterface/user/verifyOtpUseCaseInterface";

export class VerifyOtpUseCase implements IverifyOtpUseCase {
    private otpService: IotpService
    constructor(otpService: IotpService) {
        this.otpService = otpService
    }
    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
        const verify = await this.otpService.verifyOtp(email, enteredOtp)
        if (!verify) throw new Error("Invalid OTP")
        return verify
    }
}