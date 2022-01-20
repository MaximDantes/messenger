import axiosInstance from './api'
import {ITokenResponse} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'

const authApi = {
    auth: async (email: string, password: string) => {
        const response = await axiosInstance.post<ITokenResponse>('token/', {
            email, password
        })

        return response.data
    },

    refreshToken: async () => {
        const response = await axiosInstance.post<ITokenResponse>('token/refresh/')

        return {
            data: snakeToCamel<ITokenResponse>(response.data),
            status: response.status
        }
    },
}

export default authApi