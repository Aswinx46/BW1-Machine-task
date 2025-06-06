import { UserType } from "../../domain/entities/userEntity";
import { IuserRepository } from "../../domain/interface/repositoryInterfaces/IuserRepository";
import { userModel } from "../../framework/database/models/userModel";

export class UserRepository implements IuserRepository {
    async createUser(user: UserType): Promise<UserType> {
        return await userModel.create(user)
    }
    async findUserByEmail(email: string): Promise<UserType | null> {
        return await userModel.findOne({ email })
    }
    async changeKyc(email: string, kyc: string, type: "image" | "video"): Promise<UserType | null> {
        return await userModel.findOneAndUpdate({ email }, { kyc, kycType: type }, { new: true })
    }
}