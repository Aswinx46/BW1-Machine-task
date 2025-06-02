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
exports.CreateUseCase = void 0;
const hashPassword_1 = require("../../framework/Bcrypt/hashPassword");
class CreateUseCase {
    constructor(userDatabase) {
        this.userDatabase = userDatabase;
        this.hashPasswordService = new hashPassword_1.HashPassword();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldUser = yield this.userDatabase.findUserByEmail(user.email);
            if (oldUser)
                throw new Error('This email is already exits');
            const hashedPassword = yield this.hashPasswordService.hashPassword(user.password);
            if (!hashedPassword)
                throw new Error("error while hashing the password");
            user.password = hashedPassword;
            const createdUser = yield this.userDatabase.createUser(user);
            if (!createdUser)
                throw new Error('error while creating user');
            return createdUser;
        });
    }
}
exports.CreateUseCase = CreateUseCase;
