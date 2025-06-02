"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtpUseCase = void 0;
class SendOtpUseCase {
    constructor(otpService, emailService, userDatabase) {
        this.otpService = otpService;
        this.emailService = emailService;
        this.userDatabase = userDatabase;
    }
    sendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDatabase.findUserByEmail(email);
            if (user)
                throw new Error('This email is already exits');
            const otp = this.otpService.genarateOtp();
            console.log('before sending otp');
            yield this.otpService.storeOtp(email, otp);
            console.log('after sending otp');
            yield this.emailService.sendEmailOtp(email, otp);
            console.log('after sending email');
        });
    }
}
exports.SendOtpUseCase = SendOtpUseCase;
