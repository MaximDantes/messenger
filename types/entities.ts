export interface IChat {
    readonly id: number
    readonly title: string
    readonly messages: IMessage[]
}

export interface IAuthResponse {
    readonly access: string
}

export interface IMessage {
    id: number
    text: string
    chatId: number
    userId: number
    date: Date
}

export interface IProfile {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}