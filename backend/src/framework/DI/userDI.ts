import { CreateUserController } from "../../adapters/controllers/user/createUserController";
import { LoginUserController } from "../../adapters/controllers/user/loginUserController";
import { UserRepository } from "../../adapters/repository/userRepository";
import { CreateUseCase } from "../../useCases/user/createUserUseCase";
import { LoginUserUseCase } from "../../useCases/user/loginUserUseCase";


//----------------------------------------------User creation----------------------
const userDatabase = new UserRepository()
const createUserUseCase = new CreateUseCase(userDatabase)
export const injectedCreateUserController = new CreateUserController(createUserUseCase)

//----------------------------------------------User Login--------------------
const loginUserUseCase = new LoginUserUseCase(userDatabase)
export const injectedUserLoginController = new LoginUserController(loginUserUseCase)