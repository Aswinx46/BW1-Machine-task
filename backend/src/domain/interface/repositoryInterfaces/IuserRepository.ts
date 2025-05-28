import { UserType } from "../../entities/userEntity";

export interface IuserRepository {
    createUser(user:UserType):Promise<UserType>
    findUserByEmail(email:string):Promise<UserType | null>
    
}