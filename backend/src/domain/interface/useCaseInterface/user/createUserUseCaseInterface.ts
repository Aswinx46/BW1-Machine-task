import { UserType } from "../../../entities/userEntity";

export interface IcreateUserUseCase {
    createUser(user: UserType): Promise<UserType>
}