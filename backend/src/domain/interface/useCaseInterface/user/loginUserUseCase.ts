export interface IloginUseCase {
    loginUser(email: string, password: string): Promise<void>
}