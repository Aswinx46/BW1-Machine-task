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
exports.CreateUserController = void 0;
const httpStatus_1 = require("../../../domain/entities/httpStatus");
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    handleCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                yield this.createUserUseCase.createUser(user);
                res.status(httpStatus_1.HttpStatus.OK).json({ mmessage: "User Created" });
            }
            catch (error) {
                console.log('error in createUserController while crreating user', error);
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                    message: "error while creating user",
                    error: error instanceof Error ? error.message : 'error while creating user'
                });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
