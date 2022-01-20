import {Thunk} from './messages-reducer'
import messagesApi from '../../api/messages-api'
import store from '../store'
import {messagesReceived} from './messages-actions'


export const getNextChatMessages = (chatId: number): Thunk => async (dispatch) => {

    const next = store.getState().chats.nextCursor

    const result = await messagesApi.get(chatId, next)

    dispatch(messagesReceived(result.results))


}