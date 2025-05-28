import { isAxiosError } from 'axios'
import axios from '../../axios/userAxios/userAxios'
import type { SignupValues } from '@/types/signupType'
export const userLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error while logining user', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while logining user')
    }
}

export const sendOtp = async (email: string) => {
    try {
        const response = await axios.post('/sendOtp', { email })
        return response.data
    } catch (error) {
        console.log('error while sending otp', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while sending otp')
    }
}

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await axios.post('/verifyOtp', { email, otp })
        return response.data
    } catch (error) {
        console.log('error while verifying otp', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while verifying otp')
    }
}

export const userSignup = async (user: SignupValues) => {
    try {
        const response = await axios.post('/createUser', { user })
        return response.data
    } catch (error) {
        console.log('error while signing up', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while creating user')
    }
}