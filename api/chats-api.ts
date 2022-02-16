import {IChat} from '../types/entities'
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
            members: [
                {
                    id: 1,
                    email: 'mfetisov2002@gmail.com',
                    phone: '+375294539810',
                    firstName: 'Сципион',
                    lastName: 'Африканский',
                    avatar: 'https://ggaekappbucket.s3.amazonaws.com/media/mfetisov2002%40gmail.com/hE2kUb1aNfY1.jpg',
                },
                {
                    id: 2,
                    email: 'po14342@gmail.com',
                    phone: '+375294539810',
                    firstName: 'Лоуренс',
                    lastName: 'Аравийский',
                    avatar: 'https://ggaekappbucket.s3.amazonaws.com/media/mfetisov2002%40gmail.com/hE2kUb1aNfY1.jpg',
                },
                {
                    id: 3,
                    email: 'ggaek@ggaek.by',
                    phone: '+375294539810',
                    firstName: 'Михаил',
                    lastName: 'Милорадович',
                    avatar: 'https://ggaekappbucket.s3.amazonaws.com/media/mfetisov2002%40gmail.com/hE2kUb1aNfY1.jpg',
                },
            ]
        })))
    },
}