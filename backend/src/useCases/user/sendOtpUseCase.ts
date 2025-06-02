import { IuserRepository } from "../../domain/interface/repositoryInterfaces/IuserRepository";
import { IemailService } from "../../domain/interface/serviceInterfaces/IemailService";
import { IotpService } from "../../domain/interface/serviceInterfaces/IotpService";
import { IsendOtpUseCase } from "../../domain/interface/useCaseInterface/user/sendOtpUseCaseInterface";

export class SendOtpUseCase implements IsendOtpUseCase {
    private otpService: IotpService
    private userDatabase: IuserRepository
    private emailService: IemailService
    constructor(otpService: IotpService, emailService: IemailService, userDatabase: IuserRepository) {
        this.otpService = otpService
        this.emailService = emailService
        this.userDatabase = userDatabase
    }
    async sendOtp(email: string): Promise<void> {
        const user = await this.userDatabase.findUserByEmail(email)
        if (user) throw new Error('This email is already exits')
        const otp = this.otpService.genarateOtp()
        console.log('before sending otp')
        await this.otpService.storeOtp(email, otp)
        console.log('after sending otp')
        await this.emailService.sendEmailOtp(email, otp)
        console.log('after sending email')
    }
}