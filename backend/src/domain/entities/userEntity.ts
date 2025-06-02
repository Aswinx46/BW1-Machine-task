import { ObjectId } from "mongoose"

export interface UserType {
    _id?: string | ObjectId
    email: string
    password: string
    kyc?: string
    kycType?: 'image' | 'video'
}