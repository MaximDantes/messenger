import {IMessage} from '../../types/dto'
import {WebSocketStatus} from './reducer'

export const messagesReceived = (messages: IMessage[]) => ({
    type: 'messages/MESSAGES_RECEIVED',
    payload: messages
} as const)

export const statusChanged = (status: WebSocketStatus) => ({
    type: 'messages/STATUS_CHANGED',
    payload: status
} as const)