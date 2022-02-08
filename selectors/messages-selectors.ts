import {State} from '../store/store'

export const selectChatMessages = (state: State, chatId: number) =>
    state.messages.messages.filter(item => item.chatId === chatId)

export const selectMessagesFetching = (state: State) => state.messages.isFetching