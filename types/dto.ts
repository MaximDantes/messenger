export interface IChat {
    readonly id: number
    readonly title: string
}

export interface IAuthResponse {
    readonly access: string
}

export interface IMessage {
    id: number
    text: string
}

export interface IProfile {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}