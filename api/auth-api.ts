import axiosInstance from './api'
import {IAuthResponse} from '../types/entities'

const authApi = {
    auth: async (email: string, password: string) => {
        const response = await axiosInstance.post<IAuthResponse>('token/', {
            email, password
        })

        return response.data
    },

    refreshToken: async () => {
        const response = await axiosInstance.post<IAuthResponse>('token/refresh/')

        return response.data
    },
}

export default authApi