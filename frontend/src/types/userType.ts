export interface User {
    _id: string
    email: string
    kyc: string
    kycType: 'image' | 'video'
}