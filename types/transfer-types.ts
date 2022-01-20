import {IMessage} from './entities'

export interface IMessages {
    nextCursor: string
    previousCursor: string
    lastRead: number
    results: IMessage[]
}
