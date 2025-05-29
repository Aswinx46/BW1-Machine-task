import { UserType } from "../../../entities/userEntity";

export interface IloginUseCase {
    loginUser(email: string, password: string): Promise<UserType>
}