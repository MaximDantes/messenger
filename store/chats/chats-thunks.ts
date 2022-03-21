import {Cursors, Thunk} from './chats-reducer'
import {chatsApi} from '../../api/chats-api'
import {chatMembersReceived, chatsReceived, cursorChanged, lastMessageChanged} from './chats-actions'
import {IMessage} from '../../types/entities'
import {statusCodes} from '../../types/status-codes'
import handleTokenExpired from '../handle-token-expired'

export const getChats = (userId: number): Thunk => async (dispatch) => {
    try {
        const response = await chatsApi.get(userId)

        dispatch(chatsReceived(response))
    } catch (e) {
        console.error('get chats', e)
        await handleTokenExpired(e, () => dispatch(getChats(userId)))
    }
}

export const getChatMembers = (chatId: number): Thunk => async (dispatch) => {
    try {
        const response = await chatsApi.getMembers(chatId)

        if (response.status === statusCodes.success) {
            dispatch(chatMembersReceived(chatId, response.data))
        }
    } catch (e) {
        console.error('get chat members', e)
        await handleTokenExpired(e, () => dispatch(getChatMembers(chatId)))
    }
}

export const setCursors = (cursors: Cursors, chatId: number): Thunk => async (dispatch) => {
    dispatch(cursorChanged(cursors, chatId))
}

export const setLastMessage = (message: IMessage): Thunk => async (dispatch) => {
    dispatch(lastMessageChanged(message))
}