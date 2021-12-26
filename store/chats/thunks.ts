import {ChatsThunkResult} from './reducer'
import {chatsApi} from '../../api/chats-api'
import {_setChats} from './actions'

export const getChats = (userId: number): ChatsThunkResult => async (dispatch) => {
    try {
        const response = await chatsApi.get(userId)

        dispatch(_setChats(response))
    } catch (e) {
        console.error(e)
    }
}