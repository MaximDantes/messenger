import {State} from '../store/store'

export const selectFiles = (type: 'IMG' | 'DOC', chatId: number) => (state: State) =>
    state.files.files.filter(item => item.fileType === type && item.chatId === chatId)