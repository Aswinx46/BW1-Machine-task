import { UserType } from "../../../entities/userEntity";

export interface IupdateKycUseCase {
    updateKyc(email: string, kyc: string, type: 'image' | 'video'): Promise<UserType>
}