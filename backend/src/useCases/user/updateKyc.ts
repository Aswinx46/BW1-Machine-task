import { UserType } from "../../domain/entities/userEntity";
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/IuserRepository";
import { IupdateKycUseCase } from "../../domain/interface/useCaseInterface/user/updateKycUseCaseInterface";

export class UpdateKycUseCase implements IupdateKycUseCase {
    private userDatabase: IuserRepository
    constructor(userDatabase: IuserRepository) {
        this.userDatabase = userDatabase
    }
    async updateKyc(email: string, kyc: string, type: 'image' | 'video'): Promise<UserType> {
        const updateKyc = await this.userDatabase.changeKyc(email, kyc, type)
        if (!updateKyc) throw new Error("No user found in this email")
        return updateKyc
    }
}