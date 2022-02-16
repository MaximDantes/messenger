import * as actions from './chats-actions'
import {IChat} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'

const initialState = {
    chats: [] as IChat[],

}

const chatsReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'chats/CHATS_RECEIVED':
            return {
                ...state,
                chats: action.payload
            }

        case 'chats/CURSORS_CHANGED': {
            const chat = state.chats.find(item => item.id === action.payload.chatId)

            if (!chat) return state

            let newChat: IChat = {...chat}

            if (action.payload.cursors.nextMessages !== undefined) {
                newChat = {...newChat, nextMessagesCursor: action.payload.cursors.nextMessages}
            }
            if (action.payload.cursors.nextFiles !== undefined) {
                newChat = {...newChat, nextFilesCursor: action.payload.cursors.nextFiles}
            }
            if (action.payload.cursors.nextImages !== undefined) {
                newChat = {...newChat, nextImagesCursor: action.payload.cursors.nextImages}
            }

            return {
                ...state,
                chats: [...state.chats.filter(item => item.id !== action.payload.chatId), newChat]
            }
        }


        case 'chats/LAST_MESSAGE_CHANGED': {
            const chat = state.chats.find(item => item.id === action.payload.chatId)

            if (chat) {
                const newChat: IChat = {
                    ...chat,
                    lastMessage: {
                        id: action.payload.id,
                        text: action.payload.text,
                        date: action.payload.date,
                        user: {
                            avatar: action.payload.user.avatar
                        }
                    }
                }

                return {
                    ...state,
                    chats: [...state.chats.filter(item => item.id !== action.payload.chatId), newChat]
                }
            }

            return state
        }

        default:
            return state
    }
}

export default chatsReducer

export type Cursors = {
    nextMessages?: string,
    nextImages?: string,
    nextFiles?: string,
}

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
