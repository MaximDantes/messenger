import {Thunk} from './messages-reducer'
import websocketApi from '../../api/websocket-api'
import {IMessage, IFile} from '../../types/entities'
import {fetchingChanged, messageReceived, messageSent, messagesReceived} from './messages-actions'
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

export const startMessagesListening = (): Thunk => async (dispatch) => {
    websocketApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string, chatId: number, userId: number, files: DocumentResult[]):
    Thunk => async (dispatch) => {

    const clientSideId = store.getState().messages.clientSideId

    const preloadFiles: IFile[] = []

    files.map((item, index) => {
        if (item.type === 'success') {
            preloadFiles.push({
                id: index,
                file: item.uri,
                fileName: item.name,
                fileType: item.mimeType
            })
        }
    })

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

    //TODO parallel files load
    const getFilesId = async () => {
        const filesId: string[] = []

        if (files.length > 0) {
            for (const item of files) {
                const response = await messagesApi.sendFile(chatId, item)

                filesId.push(String(response.id))
            }
        }

        return filesId
    }

    const filesId = await getFilesId()

    websocketApi.send(message, chatId, clientSideId, filesId)
}

export const getChatMessages = (chatId: number): Thunk => async (dispatch) => {
    dispatch(fetchingChanged(true))

    const cursor = store.getState().chats.chats.find(item => item.id === chatId)?.nextMessagesCursor

    const result = await messagesApi.get(chatId, cursor)

    dispatch(messagesReceived(result.results))
    dispatch(setCursors({nextMessages: result.next || ''}, chatId))

    dispatch(fetchingChanged(false))
}