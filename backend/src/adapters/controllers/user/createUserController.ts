import { Request, Response } from "express";
import { IcreateUserUseCase } from "../../../domain/interface/useCaseInterface/user/createUserUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class CreateUserController {
    private createUserUseCase: IcreateUserUseCase
    constructor(createUserUseCase: IcreateUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async handleCreateUser(req: Request, res: Response): Promise<void> {
        try {
            const { user } = req.body
            await this.createUserUseCase.createUser(user)
            res.status(HttpStatus.OK).json({ mmessage: "User Created" })
        } catch (error) {
            console.log('error in createUserController while crreating user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while creating user",
                error: error instanceof Error ? error.message : 'error while creating user'
            })
        }
    }
}