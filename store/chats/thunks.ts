import {Thunk} from './reducer'
import {chatsApi} from '../../api/chats-api'
import {chatsReceived, messagesReceived} from './actions'
import {IMessage} from '../../types/entities'
import {Dispatch} from 'redux'
import {messageReceived} from './actions'
import wsApi from '../../api/websocket-api'
import messagesApi from '../../api/messages-api'

let _newMessageHandler: ((message: IMessage) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (!_newMessageHandler) {
        _newMessageHandler = (message: IMessage) => {
            dispatch(messageReceived(message))
        }
    }

    return _newMessageHandler
}

export const getChats = (userId: number): Thunk => async (dispatch) => {
    try {
        const response = await chatsApi.get(userId)

        dispatch(chatsReceived(response))
    } catch (e) {
        console.error(e)
    }
}

export const startMessagesListening = (): Thunk => async (dispatch) => {
    wsApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): Thunk => async (dispatch) => {
    wsApi.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string, chatId: number): Thunk => async (dispatch) => {
    wsApi.send(message, chatId)
}

export const getChatMessages = (chatId: number): Thunk => async (dispatch) => {
    const result = await messagesApi.get(chatId)

    dispatch(messagesReceived(result))
}