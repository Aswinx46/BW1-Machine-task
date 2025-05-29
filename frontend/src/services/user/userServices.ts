import { isAxiosError } from 'axios'
import axios from '../../axios/userAxios/userAxios'
import type { SignupValues } from '@/types/signupType'
import cloudAxios from 'axios'
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

export const uploadImageCloudinary = async (formdata: FormData) => {
    try {
        const response = await cloudAxios.post(import.meta.env.VITE_API_CLOUDINARY_URL_IMAGE, formdata)
        return response.data
    } catch (error) {
        console.log('error while uploding image', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        }
        throw 'error while uploading image'
    }
}

export const uploadVideoCloudinary = async (formdata: FormData) => {
    try {
        const url = import.meta.env.VITE_API_CLOUDINARY_URL_VIDEO
        console.log('this is url', url)
        const response = await cloudAxios.post(url, formdata)
        return response.data
    } catch (error) {
        console.log('error while uploding video', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        }
        throw 'error while uploading video'
    }
}

export const updateKyc = async (email: string, kyc: string, type: 'image' | 'video') => {
    try {
        const response = await axios.post('/updateKyc', { email, kyc, type })
        return response.data
    } catch (error) {
        console.log('error while upating kyc', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while updaitng kyc')
    }
}