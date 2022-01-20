import {IChat, IMessage} from '../../types/entities'
import {IMessages} from '../../types/transfer-types'

export const messagesReceived = (messages: IMessage[]) => ({
    type: 'messages/MESSAGES_RECEIVED',
    payload: messages
} as const)

export const messageReceived = (message: IMessage) => ({
    type: 'messages/MESSAGE_RECEIVED',
    payload: message
} as const)