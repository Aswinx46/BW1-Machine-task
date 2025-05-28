import { decodedTokenEntity } from "../../domain/entities/decodedTokenEntity";
import { IjwtService } from "../../domain/interface/serviceInterfaces/IjwtService";
import jwt from "jsonwebtoken";
export class JwtService implements IjwtService {
    createAccessToken(accessSecretkey: string, userId: string): string {
        return jwt.sign(userId, accessSecretkey, { expiresIn: '15m' })
    }
    createRefreshToken(refreshSercretKey: string, userId: string): string {
        return jwt.sign(refreshSercretKey, userId, { expiresIn: '1d' })
    }
    tokenDecode(accessToken: string): decodedTokenEntity | null {
        return jwt.decode(accessToken) as decodedTokenEntity
    }
    verifyAccessToken(accessToken: string, accessSecretKey: string): { userId: string } | null {
        try {
            return jwt.verify(accessToken, accessSecretKey) as { userId: string }
        } catch (error) {
            console.log('error while verifyng access token', error)
            return null
        }
    }
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string): { userId: string; } | null {
        try {
            return jwt.verify(refreshToken, refreshSecretKey) as { userId: string }
        } catch (error) {
            console.log('error while verifying error', error)
            return null
        }
    }
}