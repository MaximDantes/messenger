import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IChat} from '../../types/entities'

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

        case 'chats/MESSAGES_RECEIVED': {
            let newChats = [...state.chats]

            //TODO immutable
            action.payload.results.map(message => {
                const chat = newChats.find(chat => chat.id === message.chatId)

                if (chat) {
                    const newChat: IChat = {
                        ...chat,
                        messages: [...chat.messages, message]
                    }

                    newChats = [...newChats.filter(item => item.id !== newChat.id), newChat]
                }
            })

            return {
                ...state,
                chats: newChats
            }
        }

        case 'chats/MESSAGE_RECEIVED': {
            let newChats = [...state.chats]

            const message = action.payload

            const chat = newChats.find(chat => chat.id === message.chatId)

            if (chat) {
                const newChat: IChat = {
                    ...chat,
                    messages: [...chat.messages, message]
                }

                newChats = [...newChats.filter(item => item.id !== newChat.id), newChat]
            }

            return {
                ...state,
                chats: newChats
            }
        }

        default:
            return state
    }
}

export default chatsReducer


type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type Thunk = ThunkAction<void, State, undefined, Action>