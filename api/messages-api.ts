import axiosInstance from './api'
import {snakeToCamel} from '../utilits/case-convert'
import {formatDate} from '../utilits/format-date'
import {IFile, IMessage} from '../types/entities'

const messagesApi = {
    get: async (chatId: number, cursor?: string) => {
        let url = `chat/${chatId}/messages`

        if (cursor) {
            url += `?cursor=${cursor}`
        } else {
            url += '/'
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
            results: camelCase.results.map((item: IMessage) => formatDate<IMessage>(item))
        }
    },

    sendFile: async (chatId: number, file: IFile) => {
        const formData = new FormData()

        if (file.fileData) {
            formData.append('file', file.fileData)
        } else {
            formData.append('file', {
                //@ts-ignore
                name: file.fileName, type: file.fileType, uri: file.file,
            })
        }

        const response = await axiosInstance.post<IFile>(`chat/${chatId}/files/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    }
}

export default messagesApi