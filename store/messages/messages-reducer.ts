import * as actions from './messages-actions'
import {IMessage} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/typescript'

const initialState = {
    messages: [] as IMessage[]
}

const messagesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'messages/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        case 'messages/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }


        default:
            return state
    }
}

export default messagesReducer


export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>