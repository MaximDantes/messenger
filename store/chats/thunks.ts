import {Thunk} from './reducer'
import {chatsApi} from '../../api/chats-api'
import {chatsReceived, messagesReceived, messagesReceivingStateChanged} from './actions'
import {IMessage} from '../../types/entities'
import {Dispatch} from 'redux'
import {messageReceived} from './actions'
import wsApi from '../../api/websocket-api'
import messagesApi from '../../api/messages-api'
import {DocumentResult} from 'expo-document-picker'
import store from '../store'

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

export const sendMessage = (message: string, chatId: number, files: DocumentResult[]): Thunk => async (dispatch) => {
    //TODO parallel files load
    const getFilesId = async () => {
        const filesId: string[] = []

        if (files.length > 0) {
            for (const item of files) {
                const response = await messagesApi.sendFile(chatId, item)

                filesId.push(String(response.id))
            }
        }

        return filesId
    }

    const filesId = await getFilesId()

    wsApi.send(message, chatId, filesId)
}

export const getChatMessages = (chatId: number): Thunk => async (dispatch) => {
    dispatch(messagesReceivingStateChanged(true))

    const result = await messagesApi.get(chatId)

    dispatch(messagesReceived(result, chatId))

    dispatch(messagesReceivingStateChanged(false))
}

export const getNextChatMessages = (chatId: number): Thunk => async (dispatch) => {
    dispatch(messagesReceivingStateChanged(true))

    const next = store.getState().chats.nextCursor

    const result = await messagesApi.get(chatId, next)

    dispatch(messagesReceived(result, chatId))

    dispatch(messagesReceivingStateChanged(false))
}

