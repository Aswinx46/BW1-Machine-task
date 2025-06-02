"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectedRefreshTokenController = exports.injectedUserLogoutController = exports.injectedUpdateKycController = exports.injectedUserLoginController = exports.injectedVerifyOtpUseCase = exports.injectedSendOtpController = exports.injectedCreateUserController = void 0;
const createUserController_1 = require("../../adapters/controllers/user/createUserController");
const loginUserController_1 = require("../../adapters/controllers/user/loginUserController");
const refreshTokenController_1 = require("../../adapters/controllers/user/refreshTokenController");
const sendOtpUserController_1 = require("../../adapters/controllers/user/sendOtpUserController");
const updateKycController_1 = require("../../adapters/controllers/user/updateKycController");
const userLogoutController_1 = require("../../adapters/controllers/user/userLogoutController");
const verifyOtpUserController_1 = require("../../adapters/controllers/user/verifyOtpUserController");
const userRepository_1 = require("../../adapters/repository/userRepository");
const createUserUseCase_1 = require("../../useCases/user/createUserUseCase");
const loginUserUseCase_1 = require("../../useCases/user/loginUserUseCase");
const sendOtpUseCase_1 = require("../../useCases/user/sendOtpUseCase");
const updateKyc_1 = require("../../useCases/user/updateKyc");
const userLogout_1 = require("../../useCases/user/userLogout");
const verifyEmailOtpUseCase_1 = require("../../useCases/user/verifyEmailOtpUseCase");
const emailService_1 = require("../services/emailService");
const jwtService_1 = require("../services/jwtService");
const otpService_1 = require("../services/otpService");
//----------------------------------------------User creation----------------------
const userDatabase = new userRepository_1.UserRepository();
const createUserUseCase = new createUserUseCase_1.CreateUseCase(userDatabase);
exports.injectedCreateUserController = new createUserController_1.CreateUserController(createUserUseCase);
//-------------------------------------send otp-----------------------
const otpService = new otpService_1.OtpService();
const EmailService = new emailService_1.emailService();
const sendOtpUseCase = new sendOtpUseCase_1.SendOtpUseCase(otpService, EmailService, userDatabase);
exports.injectedSendOtpController = new sendOtpUserController_1.SendOtpUserController(sendOtpUseCase);
//----------------------------------verify otp-----------------------
const verifyOtpUseCase = new verifyEmailOtpUseCase_1.VerifyOtpUseCase(otpService);
exports.injectedVerifyOtpUseCase = new verifyOtpUserController_1.VerifyOtpUserController(verifyOtpUseCase);
//----------------------------------------------User Login--------------------
const jwtService = new jwtService_1.JwtService();
const loginUserUseCase = new loginUserUseCase_1.LoginUserUseCase(userDatabase);
exports.injectedUserLoginController = new loginUserController_1.LoginUserController(loginUserUseCase, jwtService);
//-----------------------------------update Kyc------------------
const updateKycUseCase = new updateKyc_1.UpdateKycUseCase(userDatabase);
exports.injectedUpdateKycController = new updateKycController_1.UpdateKycController(updateKycUseCase);
//----------------------------- user logout --------------------
const userLogout = new userLogout_1.UserLogoutUseCase(jwtService);
exports.injectedUserLogoutController = new userLogoutController_1.UserLogoutController(userLogout);
//---------------------refresh token -----------------------
exports.injectedRefreshTokenController = new refreshTokenController_1.RefreshTokenController(jwtService);
