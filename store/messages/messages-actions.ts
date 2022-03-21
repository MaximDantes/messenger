import {IMessage} from '../../types/entities'
import message from '../../components/Messages/Message'

export const messagesReceived = (messages: IMessage[]) => ({
    type: 'messages/MESSAGES_RECEIVED',
    payload: messages
} as const)

export const messageReceived = (message: IMessage) => ({
    type: 'messages/MESSAGE_RECEIVED',
    payload: message
} as const)

export const messageDeleted = (id: number, chatId: number) => ({
    type: 'messages/MESSAGE_DELETED',
    payload: {id, chatId}
} as const)

export const messageEdited = (message: IMessage) => ({
    type: 'messages/MESSAGE_EDITED',
    payload: message
} as const)

export const messageSent = (message: IMessage) => ({
    type: 'messages/MESSAGE_SENT',
    payload: message
} as const)

export const messageSendingStateChanged = (messageId: number, chatId: number, isSending: boolean) => ({
    type: 'messages/MESSAGES_SENDING_STATE_CHANGED',
    payload: {messageId, chatId, isSending}
} as const)

export const fetchingChanged = (value: boolean) => ({
    type: 'messages/FETCHING_CHANGED',
    payload: value
} as const)