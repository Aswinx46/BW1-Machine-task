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
exports.VerifyOtpUserController = void 0;
const httpStatus_1 = require("../../../domain/entities/httpStatus");
class VerifyOtpUserController {
    constructor(verifyOtpUserController) {
        this.verifyOtpUserController = verifyOtpUserController;
    }
    handleVerifyOtpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                yield this.verifyOtpUserController.verifyOtp(email, otp);
                res.status(httpStatus_1.HttpStatus.OK).json({ message: "OTP Verified Please Login " });
            }
            catch (error) {
                console.log('error while verifying otp', error);
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                    message: 'error while verifying otp',
                    error: error instanceof Error ? error.message : 'error while verifying otp'
                });
            }
        });
    }
}
exports.VerifyOtpUserController = VerifyOtpUserController;
