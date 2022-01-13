import {IChat, IMessage} from '../../types/entities'
import {IMessages} from '../../types/transfer-types'

export const chatsReceived = (chats: IChat[]) => ({
    type: 'chats/CHATS_RECEIVED',
    payload: chats
} as const)

export const messagesReceived = (messages: IMessages, chatId: number) => ({
    type: 'chats/MESSAGES_RECEIVED',
    payload: {messages, chatId}
} as const)

export const messageReceived = (message: IMessage) => ({
    type: 'chats/MESSAGE_RECEIVED',
    payload: message
} as const)

export const messagesReceivingStateChanged = (isReceiving: boolean) => ({
    type: 'chats/MESSAGES_RECEIVING_STATE_CHANGED',
    payload: isReceiving
} as const)