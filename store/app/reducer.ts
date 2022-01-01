import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IMessage} from '../../types/dto'

const initialState = {
    messages: [] as IMessage[],
    status: 'disconnected' as WebSocketStatus
}

const messagesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'messages/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }

        case 'messages/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload
            }

        default:
            return state
    }
}

export default messagesReducer

type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type Thunk = ThunkAction<void, State, undefined, Action>

export type WebSocketStatus = 'disconnected' | 'connecting' | 'ready'