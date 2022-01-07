import {IChat, IMessage} from '../../types/entities'
import {IMessages} from '../../types/transfer-types'

export const chatsReceived = (chats: IChat[]) => ({
    type: 'chats/CHATS_RECEIVED',
    payload: chats
} as const)

export const messagesReceived = (messages: IMessages) => ({
    type: 'chats/MESSAGES_RECEIVED',
    payload: messages
} as const)

export const messageReceived = (message: IMessage) => ({
    type: 'chats/MESSAGE_RECEIVED',
    payload: message
} as const)