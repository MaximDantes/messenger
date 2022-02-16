import {State} from '../store/store'

export const selectChats = (state: State) => state.chats.chats
    .sort((prev, next) => {
    const prevDate = prev.lastMessage?.date.getDate() || -1
    const nextDate = next.lastMessage?.date.getDate() || -1

    return prevDate - nextDate
}).reverse()


export const selectChat = (state: State, chatId: number) => state.chats.chats.find(item => item.id === chatId)