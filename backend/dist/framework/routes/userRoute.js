"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const userDI_1 = require("../DI/userDI");
const middlewareDI_1 = require("../DI/middlewareDI");
class UserRoute {
    constructor() {
        this.userRoute = (0, express_1.Router)();
        this.setRoute();
    }
    setRoute() {
        this.userRoute.post('/createUser', (req, res) => {
            userDI_1.injectedCreateUserController.handleCreateUser(req, res);
        });
        this.userRoute.post('/login', (req, res) => {
            userDI_1.injectedUserLoginController.handleUserLogin(req, res);
        });
        this.userRoute.post('/sendOtp', (req, res) => {
            userDI_1.injectedSendOtpController.handleSendOtp(req, res);
        });
        this.userRoute.post('/verifyOtp', (req, res) => {
            userDI_1.injectedVerifyOtpUseCase.handleVerifyOtpUser(req, res);
        });
        this.userRoute.post('/updateKyc', middlewareDI_1.injectedTokenMiddleware, (req, res) => {
            userDI_1.injectedUpdateKycController.handleUpdateKyc(req, res);
        });
        this.userRoute.post('/logout', middlewareDI_1.injectedTokenMiddleware, (req, res) => {
            userDI_1.injectedUserLogoutController.handleUserLogout(req, res);
        });
        this.userRoute.post('/refreshToken', (req, res) => {
            userDI_1.injectedRefreshTokenController.handleRefreshToken(req, res);
        });
    }
}
exports.UserRoute = UserRoute;
