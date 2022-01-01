import {Thunk} from './reducer'
import messagesApi from '../../api/messages-api'
import {messagesReceived} from './actions'
import {Dispatch} from 'redux'
import {IMessage} from '../../types/dto'

let _newMessageHandler: ((messages: IMessage[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (!_newMessageHandler) {
        _newMessageHandler = (messages: IMessage[]) => {
            dispatch(messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): Thunk => async (dispatch) => {
    messagesApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): Thunk => async (dispatch) => {
    messagesApi.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): Thunk => async (dispatch) => {
    messagesApi.send(message)
}
