import { Request, Response } from "express";
import { IupdateKycUseCase } from "../../../domain/interface/useCaseInterface/user/updateKycUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class UpdateKycController {
    private updateKycUseCase: IupdateKycUseCase
    constructor(updateKycUseCase: IupdateKycUseCase) {
        this.updateKycUseCase = updateKycUseCase
    }
    async handleUpdateKyc(req: Request, res: Response): Promise<void> {
        try {
            const { email, kyc, type } = req.body
            const updatedUser = await this.updateKycUseCase.updateKyc(email, kyc, type)
            res.status(HttpStatus.OK).json({ message: "KYC Updated", updatedUser })
        } catch (error) {
            console.log('error while updating kyc', error)
            res.status(HttpStatus.OK).json({
                message: 'error while updaitng kyc',
                error: error instanceof Error ? error.message : 'error while updating kyc'
            })
        }
    }
}