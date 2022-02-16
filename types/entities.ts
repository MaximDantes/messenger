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
    readonly members: IUser[]
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
    readonly specialityId: number
    readonly courseId: number
}

export interface IUser {
    readonly id: number
    readonly email: string
    readonly phone: string
    readonly firstName: string
    readonly lastName: string
    readonly avatar: string
}

export interface IFile {
    readonly id?: number
    readonly file: string
    readonly fileName?: string
    readonly fileSize?: number
    readonly fileType?: FileType
    readonly chatId?: number
    readonly fileData?: File
    readonly isUploaded?: boolean
}

export interface IArticle {
    readonly id: number
    readonly title: string
    readonly description: string
    readonly files: IFile[]
    readonly specialityId: number
    readonly courseId: number
    readonly teacherId: number
}

export interface ISpeciality {
    readonly id: number,
    readonly abbreviation: string
}