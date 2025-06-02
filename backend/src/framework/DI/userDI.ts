import { CreateUserController } from "../../adapters/controllers/user/createUserController";
import { LoginUserController } from "../../adapters/controllers/user/loginUserController";
import { RefreshTokenController } from "../../adapters/controllers/user/refreshTokenController";
import { SendOtpUserController } from "../../adapters/controllers/user/sendOtpUserController";
import { UpdateKycController } from "../../adapters/controllers/user/updateKycController";
import { UserLogoutController } from "../../adapters/controllers/user/userLogoutController";
import { VerifyOtpUserController } from "../../adapters/controllers/user/verifyOtpUserController";
import { UserRepository } from "../../adapters/repository/userRepository";
import { CreateUseCase } from "../../useCases/user/createUserUseCase";
import { LoginUserUseCase } from "../../useCases/user/loginUserUseCase";
import { SendOtpUseCase } from "../../useCases/user/sendOtpUseCase";
import { UpdateKycUseCase } from "../../useCases/user/updateKyc";
import { UserLogoutUseCase } from "../../useCases/user/userLogout";
import { VerifyOtpUseCase } from "../../useCases/user/verifyEmailOtpUseCase";
import { emailService } from "../services/emailService";
import { JwtService } from "../services/jwtService";
import { OtpService } from "../services/otpService";



//----------------------------------------------User creation----------------------
const userDatabase = new UserRepository()
const createUserUseCase = new CreateUseCase(userDatabase)
export const injectedCreateUserController = new CreateUserController(createUserUseCase)

//-------------------------------------send otp-----------------------
const otpService = new OtpService()
const EmailService = new emailService()
const sendOtpUseCase = new SendOtpUseCase(otpService, EmailService, userDatabase)
export const injectedSendOtpController = new SendOtpUserController(sendOtpUseCase)

//----------------------------------verify otp-----------------------
const verifyOtpUseCase = new VerifyOtpUseCase(otpService)
export const injectedVerifyOtpUseCase = new VerifyOtpUserController(verifyOtpUseCase)


//----------------------------------------------User Login--------------------
const jwtService = new JwtService()
const loginUserUseCase = new LoginUserUseCase(userDatabase)
export const injectedUserLoginController = new LoginUserController(loginUserUseCase, jwtService)

//-----------------------------------update Kyc------------------
const updateKycUseCase = new UpdateKycUseCase(userDatabase)
export const injectedUpdateKycController = new UpdateKycController(updateKycUseCase)

//----------------------------- user logout --------------------
const userLogout = new UserLogoutUseCase(jwtService)
export const injectedUserLogoutController = new UserLogoutController(userLogout)

//---------------------refresh token -----------------------
export const injectedRefreshTokenController = new RefreshTokenController(jwtService)