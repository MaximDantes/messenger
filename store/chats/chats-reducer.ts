import * as actions from './chats-actions'
import {IChat} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/typescript'

const initialState = {
    chats: [] as IChat[],
    nextCursor: '',
    previousCursor: '',
    isReceivingMessages: false,
    clientSideId: -1,
}

const chatsReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'chats/CHATS_RECEIVED':
            return {
                ...state,
                chats: action.payload
            }

        case 'chats/MESSAGES_RECEIVING_STATE_CHANGED': {
            return {
                ...state,
                isReceivingMessages: action.payload
            }
        }

        case 'chats/MESSAGES_RECEIVED': {
            let newChats = [...state.chats]

            const chat = newChats.find(item => item.id === action.payload.chatId)

            if (chat) {
                const newMessages = [...chat.messages, ...action.payload.messages.results]
                    .sort((next, prev) => next.date.getTime() - prev.date.getTime())

                chat.messages = Array.from(new Set(newMessages.map(item => item.id)))
                    .map(id => newMessages.find(item => item.id === id) || newMessages[0])

                newChats = [...newChats.filter(item => item.id !== chat.id), {...chat}]
            }

            return {
                ...state,
                chats: newChats,
                nextCursor: action.payload.messages.nextCursor || '',
                previousCursor: action.payload.messages.previousCursor || ''

            }
        }

        case 'chats/MESSAGE_RECEIVED': {
            let newChats = [...state.chats]

            const message = action.payload

            const chat = newChats.find(chat => chat.id === message.chatId)

            if (chat) {
                const newChat: IChat = {
                    ...chat,
                    messages: [...chat.messages, message],
                }

                newChats = [...newChats.filter(item => item.id !== newChat.id), newChat]
            }

            return {
                ...state,
                chats: newChats
            }
        }

        case 'chats/MESSAGE_SENT': {
            let newChats = [...state.chats]

            const chat = newChats.find(chat => chat.id === action.payload.chatId)

            if (chat) {
                const newChat: IChat = {
                    ...chat,
                    messages: [...chat.messages, {
                        chatId: action.payload.chatId,
                        files: [],
                        id: state.clientSideId - 1,
                        date: new Date(),
                        text: action.payload.message,
                        userId: 1
                    }],
                }

                newChats = [...newChats.filter(item => item.id !== newChat.id), newChat]
            }

            return {
                ...state,
                clientSideId: state.clientSideId - 1,
                chats: newChats
            }
        }

        default:
            return state
    }
}

export default chatsReducer


export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>