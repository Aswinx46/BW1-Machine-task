import { IuserLogoutUseCase } from "../../domain/interface/useCaseInterface/user/userLogoutUseCaseInterface";
import { JwtService } from "../../framework/services/jwtService";

export class UserLogoutUseCase implements IuserLogoutUseCase {
    private jwtService: JwtService
    constructor(jwtService: JwtService) {
        this.jwtService = jwtService
    }
    async logout(token: string): Promise<boolean> {
        const decode = this.jwtService.tokenDecode(token)
        console.log('after decode')
        const exp = decode?.exp
        console.log(exp)
        if (!exp) throw new Error('Invalid Token')
        return true
        // const currentTime = Math.floor(Date.now() / 1000);
        // const ttl = exp - currentTime;
        // console.log(ttl)
        // if (ttl > 0) {
        //     await this.redisService.set(`blacklist:${token}`, ttl, 'true')
        //     return true
        // }
        // return false
    }
}