import {Thunk} from './messages-reducer'
import websocketApi from '../../api/websocket-api'
import {IMessage, IFile} from '../../types/entities'
import {fetchingChanged, messageDeleted, messageReceived, messageSent, messagesReceived} from './messages-actions'
import {DocumentResult} from 'expo-document-picker'
import messagesApi from '../../api/messages-api'
import {Dispatch} from 'redux'
import {lastMessageChanged} from '../chats/chats-actions'
import {setCursors} from '../chats/chats-thunks'
import store from '../store'

let _newMessageHandler: ((message: IMessage) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    const handler = (message: IMessage) => {
        dispatch(messageReceived(message))
        dispatch(lastMessageChanged(message))
    }

    return _newMessageHandler || handler
}

let _deleteMessageHandler: ((id: number) => void) | null = null
const deleteMessageHandlerCreator = (dispatch: Dispatch) => {
    const handler = (id: number) => {
        //TODO delete immediately
        dispatch(messageDeleted(id))
    }

    return _deleteMessageHandler || handler
}

export const startMessagesListening = (): Thunk => async (dispatch) => {
    websocketApi.subscribeOnSend(newMessageHandlerCreator(dispatch))
    websocketApi.subscribeOnDelete(deleteMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string, chatId: number, userId: number, files: IFile[], articles: number[]): Thunk =>
    async (dispatch) => {
        try {
            const clientSideId = store.getState().messages.clientSideId

            const preloadFiles: IFile[] = []

            files.map(item => preloadFiles.push(item))

            //TODO preview sent articles
            const profile = store.getState().profile.profile
            profile && dispatch(messageSent({
                id: clientSideId,
                text: message,
                chatId: chatId,
                user: {
                    id: profile.id,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    avatar: profile.avatar,
                },
                date: new Date(),
                files: preloadFiles,
                inSending: true,
            }))

            const getFilesId = async () => {
                const requests: Promise<string>[] = []

                files.forEach(item => {
                    requests.push(messagesApi.sendFile(chatId, item).then(response => String(response.id)))
                })

                return await Promise.all<string>(requests)
            }

            const filesId = await getFilesId()

            websocketApi.send(message, chatId, clientSideId, filesId, articles)
        } catch (e) {
            console.error('send message', e)
        }
    }

export const removeMessage = (id: number): Thunk => async (dispatch) => {
    websocketApi.remove(id)
}

export const editMessage = (id: number, chatId: number, text: string, files: Array<DocumentResult | number>): Thunk =>
    async (dispatch) => {

        //TODO edit request
    }

export const getChatMessages = (chatId: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingChanged(true))

        const cursor = store.getState().chats.chats.find(item => item.id === chatId)?.nextMessagesCursor

        const result = await messagesApi.get(chatId, cursor)

        dispatch(messagesReceived(result.results))
        dispatch(setCursors({nextMessages: result.next || ''}, chatId))

        dispatch(fetchingChanged(false))
    } catch (e) {
        console.error('get chat messages', e)
    }
}