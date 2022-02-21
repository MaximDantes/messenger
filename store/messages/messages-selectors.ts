import {State} from '../store'

export const selectChatMessages = (chatId: number) => (state: State) =>
    state.messages.messages.filter(item => item.chatId === chatId)

export const selectMessagesFetching = (state: State) => state.messages.isFetching