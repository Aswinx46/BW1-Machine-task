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
exports.LoginUserController = void 0;
const httpStatus_1 = require("../../../domain/entities/httpStatus");
const setCookie_1 = require("../../../framework/services/setCookie");
class LoginUserController {
    constructor(loginUserUseCase, jwtService) {
        this.loginUserUseCase = loginUserUseCase;
        this.jwtService = jwtService;
    }
    handleUserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { email, password } = req.body;
                const user = yield this.loginUserUseCase.loginUser(email, password);
                const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY;
                const REFRESHTOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY;
                const accessToken = this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, ((_a = user._id) === null || _a === void 0 ? void 0 : _a.toString()) || '');
                const refreshToken = this.jwtService.createRefreshToken(REFRESHTOKEN_SECRET_KEY, ((_b = user._id) === null || _b === void 0 ? void 0 : _b.toString()) || '');
                (0, setCookie_1.setCookie)(res, refreshToken);
                res.status(httpStatus_1.HttpStatus.OK).json({ message: "User Logged In", user, accessToken });
            }
            catch (error) {
                console.log('error in userLogin controller while logining user', error);
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                    message: "error while user logining",
                    error: error instanceof Error ? error.message : 'error while logining user'
                });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
