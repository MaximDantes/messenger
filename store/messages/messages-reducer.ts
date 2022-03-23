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

        case 'messages/MESSAGE_DELETED':
            return {
                ...state,
                messages: state.messages
                    .filter(item => item.id !== action.payload.id || item.chatId !== action.payload.chatId)
            }

        case 'messages/MESSAGE_EDITED':
            const oldMessage = state.messages
                .find(item => item.id === action.payload.id && item.chatId === action.payload.chatId)

            if (oldMessage) {
                return {
                    ...state,
                    messages: formatMessages([action.payload, ...state.messages])
                }
            }

            return state

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

        case 'messages/MESSAGES_SENDING_STATE_CHANGED':
            return {
                ...state,
                messages: state.messages.map(item => {
                    return item.id === action.payload.messageId && item.chatId === action.payload.chatId ? {
                        ...item,
                        inSending: action.payload.isSending
                    } : item
                })
            }

        case 'messages/SENDING_ERROR_APPEARED':
            return {
                ...state,
                messages: state.messages.map(item => {
                    return item.id === action.payload.messageId && item.chatId === action.payload.chatId ? {
                        ...item,
                        inSending: false,
                        isError: true
                    } : item
                })
            }

        case 'messages/MESSAGE_SENT':
            return {
                ...state,
                messages: [...state.messages, action.payload],
                clientSideId: state.clientSideId - 1
            }

        case 'messages/ARTICLE_EDITED': {
            return {
                ...state,
                messages: state.messages.map(item => item.articles.find(article => article.id === action.payload.id) ? {
                    ...item,
                    articles: item.articles.map(article => article.id === action.payload.id ? action.payload : article)
                } : item)
            }
        }

        default:
            return state
    }
}

export default messagesReducer


export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>