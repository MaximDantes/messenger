import {IChat} from '../types/entities'
import axiosInstance from './api'
import {formatDate} from '../utilits/format-date'
import {snakeToCamel} from '../utilits/case-convert'

interface IChatsResponse {
    chats: IChat[]
}

export const chatsApi = {
    get: async (userId: number) => {
        const response = await axiosInstance.get<IChatsResponse>(`users/${userId}/chats/`)

        return response.data.chats.map(item => formatDate(snakeToCamel({...item, messages: []})))
    },
}