export interface IverifyOtpUseCase {
    verifyOtp(email:string,enteredOtp:string):Promise<boolean>
}