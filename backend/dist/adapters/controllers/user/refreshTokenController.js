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
exports.RefreshTokenController = void 0;
const httpStatus_1 = require("../../../domain/entities/httpStatus");
class RefreshTokenController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    handleRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "No refreshToken found" });
                    return;
                }
                const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY;
                const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY;
                // ✅ Decode and validate the refresh token
                const decoded = this.jwtService.verifyRefreshToken(refreshToken, REFRESH_TOKEN_SECRET_KEY);
                if (!decoded || !decoded.userId) {
                    res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired refresh token" });
                    return;
                }
                console.log(decoded.userId);
                const newAccessToken = this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, decoded.userId);
                res.status(httpStatus_1.HttpStatus.OK).json({ message: 'New Access Token Created', newAccessToken });
            }
            catch (error) {
                console.log('error while creating new access token', error);
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                    message: "error while creating new access token",
                    error: error instanceof Error ? error.message : 'error while creating new access token'
                });
            }
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
