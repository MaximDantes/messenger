import {IChat} from '../types/dto'

export const chatsApi = {
    get: async (userId: number) => {
        const response: IChat[] = [
            { id: 1, title: 'chat 1' },
            { id: 2, title: 'chat 2' },
            { id: 3, title: 'chat 3' },
            { id: 4, title: 'chat 4' },
            { id: 5, title: 'chat 5' },
            { id: 6, title: 'chat 6' },
            { id: 7, title: 'chat 7' },
            { id: 8, title: 'chat 8' },
            { id: 9, title: 'chat 9' },
            { id: 10, title: 'chat 10' },
            { id: 11, title: 'chat 11' },
        ]

        return new Promise<IChat[]>((resolve) => {
            setTimeout(() => {
                resolve(response)
            }, 500)
        })
    }
}