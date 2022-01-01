import {IChat} from '../../types/dto'

export const chatsReceived = (chats: IChat[]) => ({
    type: 'chats/CHATS_RECEIVED',
    payload: chats
} as const)