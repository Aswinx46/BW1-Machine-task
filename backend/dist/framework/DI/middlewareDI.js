"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectedTokenMiddleware = void 0;
const tokenValidationMiddleware_1 = require("../../adapters/middlewares/tokenValidationMiddleware");
const jwtService_1 = require("../services/jwtService");
const jwtService = new jwtService_1.JwtService();
exports.injectedTokenMiddleware = (0, tokenValidationMiddleware_1.tokenValidationMiddleware)(jwtService);
