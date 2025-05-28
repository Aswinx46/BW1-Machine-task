import { IuserRepository } from "../../domain/interface/repositoryInterfaces/IuserRepository";
import { IloginUseCase } from "../../domain/interface/useCaseInterface/user/loginUserUseCase";
import { HashPassword } from "../../framework/Bcrypt/hashPassword";

export class LoginUserUseCase implements IloginUseCase {
    private userDatabase: IuserRepository
    private hashPassword: HashPassword
    constructor(userDatabase: IuserRepository) {
        this.userDatabase = userDatabase
        this.hashPassword = new HashPassword()
    }
    async loginUser(email: string, password: string): Promise<void> {
        const user = await this.userDatabase.findUserByEmail(email)
        if (!user) throw new Error('No user found in this email')
        const passwordVerification = await this.hashPassword.comparePassword(password, user.password)
        if (!passwordVerification) throw new Error('Invalid Password')
    }
}