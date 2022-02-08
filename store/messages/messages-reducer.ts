import * as actions from './messages-actions'
import {IMessage} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import excludeSameId from '../../utilits/exclude-same-id'

const initialState = {
    messages: [] as IMessage[],
    isFetching: false,
    clientSideId: -1,
}

export const formatMessages = (messages: IMessage[]) => {
    const newMessages = excludeSameId(messages)

    return newMessages.sort((next, prev) => next.date.getTime() - prev.date.getTime())
}

const messagesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'messages/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: formatMessages([...state.messages, action.payload])
                    .filter(item => item.id !== action.payload.clientSideId)
            }

        case 'messages/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: formatMessages([...state.messages, ...action.payload])
            }

        case 'messages/FETCHING_CHANGED':
            return {
                ...state,
                isFetching: action.payload
            }

        case 'messages/MESSAGE_SENT':
            return {
                ...state,
                messages: [...state.messages, action.payload],
                clientSideId: state.clientSideId - 1
            }

        default:
            return state
    }
}

export default messagesReducer


export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>