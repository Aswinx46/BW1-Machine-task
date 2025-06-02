import { IotpService } from "../../domain/interface/serviceInterfaces/IotpService";  
import NodeCache from "node-cache";
export class OtpService implements IotpService {
    private cache: NodeCache
    constructor() {
        this.cache = new NodeCache({ stdTTL: 300 });
    }
    genarateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
    async storeOtp(email: string, otp: string): Promise<void> {
        this.cache.set(email, otp, 300)
    }
    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const storedOtp=this.cache.get(email)
        console.log('stored otp',storedOtp)
        console.log('sended otp',otp)
        
        if(!storedOtp || storedOtp != otp)
        {
            return false
        }
        this.cache.del(email)
        return true
    }
}