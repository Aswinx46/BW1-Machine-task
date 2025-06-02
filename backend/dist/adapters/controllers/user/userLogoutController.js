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
exports.UserLogoutController = void 0;
const httpStatus_1 = require("../../../domain/entities/httpStatus");
class UserLogoutController {
    constructor(userLogoutUseCase) {
        this.userLogoutUseCase = userLogoutUseCase;
    }
    handleUserLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                    return;
                }
                const token = authHeader.split(' ')[1];
                yield this.userLogoutUseCase.logout(token);
                res.status(httpStatus_1.HttpStatus.OK).json({ message: "Logout successful" });
            }
            catch (error) {
                console.log('error while user logout', error);
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                    message: "error while user logout",
                    error: error instanceof Error ? error.message : 'error while user logout'
                });
            }
        });
    }
}
exports.UserLogoutController = UserLogoutController;
