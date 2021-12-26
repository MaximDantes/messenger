import {IChat} from '../../types/dto'

export const _setChats = (chats: IChat[]) => ({
    type: 'chats/SET_CHATS',
    payload: chats
} as const)