import axiosInstance from './api'
import {IMessages} from '../types/transfer-types'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import {IMessage} from '../types/entities'
import {Platform} from 'react-native'
import {DocumentResult} from 'expo-document-picker'

const messagesApi = {
    get: async (chatId: number, cursor?: string) => {
        let url = `chat/${chatId}/messages/`

        if (cursor) {
            url += `?cursor=${cursor}`
        }

        const response = await axiosInstance.get<IMessages>(url)

        const camelCase: IMessages = snakeToCamel(response.data)

        return {
            ...camelCase,
            results: camelCase.results.map((item: IMessage) => formatDate(item))
        }
    },

    sendFile: async (chatId: number, file: DocumentResult) => {
        const formData = new FormData()

        if (file.type === 'success') {
            if (Platform.OS === 'web' && file.file) {
                formData.append('file', file.file)
            }

            if (Platform.OS === 'android' || Platform.OS === 'ios') {
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