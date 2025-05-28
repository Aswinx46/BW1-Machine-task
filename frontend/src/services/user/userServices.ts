import { isAxiosError } from 'axios'
import axios from '../../axios/userAxios/userAxios'
export const userLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error while logining user', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while logining user')
    }
}