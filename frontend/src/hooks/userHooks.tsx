import { userLogin } from "@/services/user/userServices"
import type { LoginReponse } from "@/types/loginReponseType"
import { useState } from "react"

export const useUserLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<LoginReponse | null>()

    const handleLogin = async (email: string, password: string) => {
        setLoading(true)
        try {
            const result = await userLogin(email, password)
            setData(result)
            setLoading(false)
            return result
        } catch (error) {
            setError(error instanceof Error ? error.message : "error whlie logining user")
            setLoading(false)
        }
    }

    return { handleLogin, loading, error, data }
}