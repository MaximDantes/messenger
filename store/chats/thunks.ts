import {ChatsThunkResult} from './reducer'
import {chatsApi} from '../../api/chats-api'
import {chatsReceived} from './actions'

export const getChats = (userId: number): ChatsThunkResult => async (dispatch) => {
    try {
        const response = await chatsApi.get(userId)

        dispatch(chatsReceived(response))
    } catch (e) {
        console.error(e)
    }
}