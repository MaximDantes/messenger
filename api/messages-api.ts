import axiosInstance from './api'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import {IMessage} from '../types/entities'
import {DocumentResult} from 'expo-document-picker'

const messagesApi = {
    get: async (chatId: number, cursor?: string) => {
        let url = `chat/${chatId}/messages`

        if (cursor) {
            url += `?cursor=${cursor}`
        }

        const response = await axiosInstance.get(url)

        const camelCase: {
            lastRead: number,
            next: string | null,
            previous: string | null,
            results: IMessage[]
        } = snakeToCamel(response.data)

        return {
            ...camelCase,
            results: camelCase.results.map((item: IMessage) => formatDate(item))
        }
    },

    sendFile: async (chatId: number, file: DocumentResult) => {
        const formData = new FormData()

        if (file.type === 'success') {
            if (file.file) {
                formData.append('file', file.file)
            } else {
                formData.append('file', {
                    //@ts-ignore
                    name: file.name, type: file.mimeType, uri: file.uri,
                })
            }
        }

        const response = await axiosInstance.post(`chat/${chatId}/files/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    }
}

export default messagesApi