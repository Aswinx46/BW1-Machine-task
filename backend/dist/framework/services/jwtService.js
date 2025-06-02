"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    createAccessToken(accessSecretkey, userId) {
        // return jwt.sign(userId, accessSecretkey, { expiresIn: '15m' })
        return jsonwebtoken_1.default.sign({ userId }, accessSecretkey, { expiresIn: '15m' });
    }
    createRefreshToken(refreshSercretKey, userId) {
        return jsonwebtoken_1.default.sign({ userId }, refreshSercretKey, { expiresIn: '1d' });
    }
    tokenDecode(accessToken) {
        return jsonwebtoken_1.default.decode(accessToken);
    }
    verifyAccessToken(accessToken, accessSecretKey) {
        try {
            return jsonwebtoken_1.default.verify(accessToken, accessSecretKey);
        }
        catch (error) {
            console.log('error while verifyng access token', error);
            return null;
        }
    }
    verifyRefreshToken(refreshToken, refreshSecretKey) {
        try {
            return jsonwebtoken_1.default.verify(refreshToken, refreshSecretKey);
        }
        catch (error) {
            console.log('error while verifying error', error);
            return null;
        }
    }
}
exports.JwtService = JwtService;
