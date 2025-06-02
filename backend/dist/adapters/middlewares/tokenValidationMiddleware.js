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
exports.tokenValidationMiddleware = void 0;
const httpStatus_1 = require("../../domain/entities/httpStatus");
const tokenValidationMiddleware = (jwtService) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY;
        try {
            // This should throw an error if invalid or expired
            const decoded = jwtService.verifyAccessToken(token, ACCESSTOKEN_SECRET_KEY);
            if (!decoded || decoded.exp <= 0) {
                res
                    .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
                    .json({ message: "Invalid or expired token." });
                return;
            }
            console.log(decoded);
            // Optionally store decoded token info on the request object
            req.user = decoded;
            next(); // proceed if token is valid
        }
        catch (error) {
            res
                .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
                .json({ message: "Invalid or expired token." });
        }
    });
};
exports.tokenValidationMiddleware = tokenValidationMiddleware;
