import {IChat} from '../types/entities'
import axiosInstance from './api'

interface IChatsResponse {
    chats: IChat[]
}

export const chatsApi = {
    get: async (userId: number) => {
        const response = await axiosInstance.get<IChatsResponse>(`users/${userId}/chats/`)

        return response.data.chats.map(item => ({...item, messages: []}))
    },
}