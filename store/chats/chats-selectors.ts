import {State} from '../store'

export const selectChats = (state: State) => state.chats.chats
    .sort((prev, next) => {
        const prevDate = prev.lastMessage?.date.getDate() || -1
        const nextDate = next.lastMessage?.date.getDate() || -1

        return prevDate - nextDate
    }).reverse()


export const selectChat = (chatId: number) => (state: State) => state.chats.chats.find(item => item.id === chatId)

export const selectChatMembers = (chatId: number) => (state: State) =>
    state.chats.chats.find(item => item.id === chatId)?.members.sort((prev, next) => {
        if (prev.lastName < next.lastName) return -1
        if (prev.lastName > next.lastName) return 1

        if (prev.firstName < next.firstName) return -1
        if (prev.firstName > next.firstName) return 1

        return 0
    }) || []

export const selectIsMessagesLeft = (chatId: number) => (state: State) => !!state.chats.chats
    .find(item => item.id === chatId)?.nextMessagesCursor