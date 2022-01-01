import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IChat} from '../../types/dto'

type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type ChatsThunkResult = ThunkAction<void, State, undefined, Action>

const initialState = {
    chats: [] as IChat[]
}

const chatsReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'chats/CHATS_RECEIVED':
            return {
                ...state,
                chats: action.payload
            }

        default:
            return state
    }
}

export default chatsReducer