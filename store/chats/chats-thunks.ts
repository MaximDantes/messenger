import {Cursors, Thunk} from './chats-reducer'
import {chatsApi} from '../../api/chats-api'
import {chatsReceived, cursorChanged, lastMessageChanged} from './chats-actions'
import {IMessage} from '../../types/entities'

export const getChats = (userId: number): Thunk => async (dispatch) => {
    try {
        const response = await chatsApi.get(userId)

        dispatch(chatsReceived(response))
    } catch (e) {
        console.error('get chats', e)
    }
}

export const setCursors = (cursors: Cursors, chatId: number): Thunk => async (dispatch) => {
    dispatch(cursorChanged(cursors, chatId))
}

export const setLastMessage = (message: IMessage): Thunk => async (dispatch) => {
    dispatch(lastMessageChanged(message))
}