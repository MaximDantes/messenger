import {IChat, IMessage} from '../../types/entities'
import {Cursors} from './chats-reducer'

export const chatsReceived = (chats: IChat[]) => ({
    type: 'chats/CHATS_RECEIVED',
    payload: chats
} as const)

export const cursorChanged = (cursors: Cursors, chatId: number) => ({
    type: 'chats/CURSORS_CHANGED',
    payload: {cursors, chatId}
} as const)

export const lastMessageChanged = (message: IMessage) => ({
    type: 'chats/LAST_MESSAGE_CHANGED',
    payload: message
} as const)