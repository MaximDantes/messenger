import {FileType} from './file-types'

export interface IChat {
    readonly id: number
    readonly title: string
    readonly lastMessage: {
        readonly id: number
        readonly text: string
        readonly date: Date
        readonly user: {
            readonly avatar: string
        }
    } | null
    readonly cover: string | null
    readonly nextMessagesCursor: string
    readonly previousMessagesCursor: string
    readonly nextFilesCursor: string
    readonly previousFilesCursor: string
    readonly nextImagesCursor: string
    readonly previousImagesCursor: string
}

export interface ITokenResponse {
    readonly access: string
}

export interface IMessage {
    readonly id: number
    readonly text: string
    readonly chatId: number
    readonly date: Date
    readonly files: IFile[]
    readonly user: {
        id: number
        firstName: string
        lastName: string
        avatar: string
    }
    readonly inSending?: boolean
    readonly clientSideId?: number
}

export interface IProfile {
    readonly id: number,
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly avatar: string
}

export interface IFile {
    readonly id: number
    readonly file: string
    readonly fileName?: string
    readonly fileSize?: number
    readonly fileType?: FileType
    readonly chatId?: number
}

export interface IArticle {
    title: string
    description: string
    files: IFile[]
}