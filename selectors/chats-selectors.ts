import {State} from '../store/store'

export const selectChats = (state: State) => state.chats.chats
export const selectChat = (state: State, chatId: number) => state.chats.chats.find(item => item.id === chatId)