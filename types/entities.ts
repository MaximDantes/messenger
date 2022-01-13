export interface IChat {
    readonly id: number
    readonly title: string
    messages: IMessage[]
}

export interface IAuthResponse {
    readonly access: string
}

export interface IMessage {
    readonly id: number
    readonly text: string
    readonly chatId: number
    readonly userId: number
    readonly date: Date
    readonly files: IServerFile[]
}

export interface IProfile {
    readonly id: number,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string
    readonly avatar: string
}

export interface IServerFile {
    readonly id: number
    readonly file: string,
    readonly fileName: string,
    readonly fileSize: number
}