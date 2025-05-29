import { UserType } from "../../entities/userEntity";

export interface IuserRepository {
    createUser(user: UserType): Promise<UserType>
    findUserByEmail(email: string): Promise<UserType | null>
    changeKyc(email: string, kyc: string , type:"image" | "video"): Promise<UserType | null>
}