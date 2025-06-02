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
exports.LoginUserUseCase = void 0;
const hashPassword_1 = require("../../framework/Bcrypt/hashPassword");
class LoginUserUseCase {
    constructor(userDatabase) {
        this.userDatabase = userDatabase;
        this.hashPassword = new hashPassword_1.HashPassword();
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDatabase.findUserByEmail(email);
            if (!user)
                throw new Error('No user found in this email');
            const passwordVerification = yield this.hashPassword.comparePassword(password, user.password);
            if (!passwordVerification)
                throw new Error('Invalid Password');
            return user;
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
