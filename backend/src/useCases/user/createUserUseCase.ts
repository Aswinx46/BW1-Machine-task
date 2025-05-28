import { UserType } from "../../domain/entities/userEntity";
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/IuserRepository";
import { IcreateUserUseCase } from "../../domain/interface/useCaseInterface/user/createUserUseCaseInterface";
import { HashPassword } from "../../framework/Bcrypt/hashPassword";

export class CreateUseCase implements IcreateUserUseCase {
    private userDatabase: IuserRepository
    private hashPasswordService: HashPassword
    constructor(userDatabase: IuserRepository) {
        this.userDatabase = userDatabase
        this.hashPasswordService = new HashPassword()
    }
    async createUser(user: UserType): Promise<UserType> {
        const oldUser = await this.userDatabase.findUserByEmail(user.email)
        if (oldUser) throw new Error('This email is already exits')
        const hashedPassword = await this.hashPasswordService.hashPassword(user.password)
        if (!hashedPassword) throw new Error("error while hashing the password")
        user.password = hashedPassword
        const createdUser = await this.userDatabase.createUser(user)
        if (!createdUser) throw new Error('error while creating user')
        return createdUser
    }
}