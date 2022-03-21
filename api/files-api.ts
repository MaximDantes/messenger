import axiosInstance from './api'
import {IFile} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {AxiosResponse} from 'axios'

const filesApi = {
    get: async (chatId: number, type: 'IMG' | 'DOC', cursor?: string) => {
        type Response = {
            next: string | null
            previous: string | null
            results: IFile[]
        }

        let url = `chat/${chatId}/files?file_type=${type}`
        if (cursor) url += `&cursor=${cursor.split('&')[0]}`

        const response = await axiosInstance.get(url)

        return snakeToCamel<AxiosResponse<Response>>(response)
    },
}

export default filesApi