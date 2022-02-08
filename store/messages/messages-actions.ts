import {IMessage} from '../../types/entities'

export const messagesReceived = (messages: IMessage[]) => ({
    type: 'messages/MESSAGES_RECEIVED',
    payload: messages
} as const)

export const messageReceived = (message: IMessage) => ({
    type: 'messages/MESSAGE_RECEIVED',
    payload: message
} as const)

export const messageSent = (message: IMessage) => ({
    type: 'messages/MESSAGE_SENT',
    payload: message
} as const)

export const fetchingChanged = (value: boolean) => ({
    type: 'messages/FETCHING_CHANGED',
    payload: value
} as const)