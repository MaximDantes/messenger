import axiosInstance from './api'
import {ITokenResponse} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {ErrorMessages} from '../store/exceptions'
import websocketApi from './websocket-api'

const authApi = {
    auth: async (email: string, password: string) => {
        const response = await axiosInstance.post<ITokenResponse>('token/', {
            email, password
        })

        if (response.status === 401) throw Error(ErrorMessages.invalidCredentials)

        return response
    },

    refreshToken: async () => {
        const response = await axiosInstance.post<ITokenResponse>('token/refresh/')

        return {
            data: snakeToCamel<ITokenResponse>(response.data),
            status: response.status
        }
    },

    logout: async () => {
        websocketApi.close()
        return await axiosInstance.post<ITokenResponse>('token/logout/')
    }
}

export default authApi