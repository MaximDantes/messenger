import axiosInstance from './api'
import {IMessages} from '../types/transfer-types'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import {IMessage} from '../types/entities'

const messagesApi = {
    get: async (chatId: number) => {
        const response = await axiosInstance.get<IMessages>(`chat/${chatId}/messages/`)

        const camelCase: IMessages = snakeToCamel(response.data)

        return {
            ...camelCase,
            results: camelCase.results.map((item: IMessage) => formatDate(item))
        }
    }
}

export default messagesApi