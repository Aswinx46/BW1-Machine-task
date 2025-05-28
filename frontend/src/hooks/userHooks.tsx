// import { sendOtp, userLogin, userSignup, verifyOtp } from "@/services/user/userServices"
// import type { LoginReponse } from "@/types/loginReponseType"
// import type { SignupValues } from "@/types/signupType"
// import { useState } from "react"

// export const useUserLogin = () => {
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string | null>(null)
//     const [data, setData] = useState<LoginReponse | null>(null)

//     const handleLogin = async (email: string, password: string) => {
//         setLoading(true)
//         try {
//             const result = await userLogin(email, password)
//             setData(result)
//             setLoading(false)
//             return result
//         } catch (error) {
//             setError(error instanceof Error ? error.message : "error whlie logining user")
//             setLoading(false)
//         }
//     }

//     return { handleLogin, loading, error, data }
// }

// export const useSendOtp = () => {
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string | null>(null)

//     const sendOtpFunction = async (email: string) => {
//         try {
//             const result = await sendOtp(email)
//             setLoading(false)
//             return result
//         } catch (error) {
//             if(error instanceof Error) setError(error.message)
//             setLoading(false)
//         }
//     }
//     return { sendOtpFunction, loading, error }
// }

// export const useVerifyOtp = () => {
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string | null>(null)

//     const verifyingOtp = async (email: string, enteredOtp: string) => {
//         try {
//             const result = await verifyOtp(email, enteredOtp)
//             setLoading(false)
//             return result
//         } catch (error) {
//             setError(error instanceof Error ? error.message : 'error while verifying otp')
//             setLoading(false)
//         }
//     }
//     return { verifyingOtp, loading, error }

// }

// export const useCreateUser = () => {
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string | null>(null)

//     const createUser = async (user: SignupValues) => {
//         try {
//             setLoading(true)
//             const result = await userSignup(user)
//             setLoading(false)
//             return result
//         } catch (error) {
//             console.log('error while creating user', error)
//             setLoading(false)
//             setError(error instanceof Error ? error.message : 'error while creating user')
//         }
//     }
//     return { createUser, loading, error }
// }