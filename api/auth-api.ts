import axiosInstance from './api'
import {IAuthResponse, IProfile} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'

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

    getProfile: async () => {
        const response = await axiosInstance.get<IProfile>('users/profile/')

        return snakeToCamel(response.data)
    }
}

export default authApi