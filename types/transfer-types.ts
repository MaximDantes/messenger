import {IMessage} from './entities'

export interface IMessages {
    next: string
    previous: string
    results: IMessage[]
}