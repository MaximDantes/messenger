import {IChat} from '../types/entities'
import axiosInstance from './api'
import {formatDate} from '../utilits/format-date'
import {snakeToCamel} from '../utilits/case-convert'
import {IApiChat} from '../types/api-types'

export const chatsApi = {
    get: async (userId: number) => {
        const response = await axiosInstance.get<IApiChat[]>(`users/${userId}/chats`)

        return response.data.map(item => snakeToCamel<IChat>(formatDate({
            ...item,
            nextMessagesCursor: '',
            previousMessagesCursor: '',
            nextFilesCursor: '',
            previousFilesCursor: '',
            nextImagesCursor: '',
            previousImagesCursor: '',
            clientSideId: -1,
        })))
    },
}