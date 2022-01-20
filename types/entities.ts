export interface IChat {
    id: number
    title: string
    messages: IMessage[]
    lastMessage: {
        id: number,
        text: string,
        date: Date
        user: {
            avatar: string,
        },
    }
    cover: string
}

export interface ITokenResponse {
    access: string
}


export interface IPreloadMessage {
    text: string
    chatId: number
    userId: number
    files: {

    }[]
}

export interface IMessage {
    id: number
    text: string
    chatId: number
    userId: number
    date: Date
    files: IServerFile[]
    clientSideId?: number
}

export interface IProfile {
    id: number,
    firstName: string,
    lastName: string,
    email: string
    avatar: string
}

export interface IServerFile {
    id: number
    file: string,
    fileName: string,
    fileSize: number
}