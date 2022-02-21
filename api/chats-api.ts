import {IChat, IUser} from '../types/entities'
import axiosInstance from './api'
import {formatDate} from '../utilits/format-date'
import {snakeToCamel} from '../utilits/case-convert'

export const chatsApi = {
    get: async (userId: number) => {
        const response = await axiosInstance.get<IChat[]>(`users/${userId}/chats`)

        return response.data.map(item => formatDate<IChat>(snakeToCamel({
            ...item,
            nextMessagesCursor: '',
            previousMessagesCursor: '',
            nextFilesCursor: '',
            previousFilesCursor: '',
            nextImagesCursor: '',
            previousImagesCursor: '',
            clientSideId: -1,
            members: [],
        })))
    },

    getMembers: async (chatId: number) => {
        const response = await axiosInstance.get(`chat/${chatId}/users`)

        return {
            data: snakeToCamel<IUser[]>(response.data),
            status: response.status
        }
    },
}