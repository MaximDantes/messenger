import {Thunk} from './messages-reducer'
import websocketApi from '../../api/websocket-api'
import {IArticlePreview, IFile, IMessage} from '../../types/entities'
import {
    fetchingChanged, messageArticleEdited,
    messageDeleted,
    messageEdited,
    messageReceived,
    messageSendingStateChanged,
    messageSent,
    messagesReceived, sendingErrorAppeared
} from './messages-actions'
import messagesApi from '../../api/messages-api'
import {Dispatch} from 'redux'
import {lastMessageChanged} from '../chats/chats-actions'
import {setCursors} from '../chats/chats-thunks'
import store from '../store'
import handleTokenExpired from '../handle-token-expired'

let _newMessageHandler: ((message: IMessage) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    const handler = (message: IMessage) => {
        dispatch(messageReceived(message))
        dispatch(lastMessageChanged(message))
    }

    return _newMessageHandler || handler
}

let _deleteMessageHandler: ((id: number, chatId: number) => void) | null = null
const deleteMessageHandlerCreator = (dispatch: Dispatch) => {
    const handler = (id: number, chatId: number) => {
        dispatch(messageSendingStateChanged(id, chatId, true))
        dispatch(messageDeleted(id, chatId))
    }

    return _deleteMessageHandler || handler
}

let _editMessageHandler: ((message: IMessage) => void) | null = null
const editMessageHandlerCreator = (dispatch: Dispatch) => {
    const handler = (message: IMessage) => {
        dispatch(messageEdited(message))
        dispatch(messageSendingStateChanged(message.id, message.chatId, false))
    }

    return _editMessageHandler || handler
}

export const startMessagesListening = (): Thunk => async (dispatch) => {
    websocketApi.subscribeOnSend(newMessageHandlerCreator(dispatch))
    websocketApi.subscribeOnDelete(deleteMessageHandlerCreator(dispatch))
    websocketApi.subscribeOnEdit(editMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string, chatId: number, userId: number, files: IFile[], articles: IArticlePreview[]): Thunk =>
    async (dispatch, getState) => {
        try {
            const clientSideId = getState().messages.clientSideId

            const preloadFiles: IFile[] = []

            files.map(item => preloadFiles.push(item))

            const profile = getState().profile.profile

            const maxFileSize = files.reduce((prev, curr) => Math.max(prev, curr.fileSize || 0), 0) || 0

            const showPreloaderTimeout = 2000 + (maxFileSize / 3000 + 1000) * files.length

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
                articles,
                clientSideId: clientSideId,

                showPreloaderTimer: setTimeout(() => {
                    dispatch(messageSendingStateChanged(clientSideId, chatId, true))
                }, showPreloaderTimeout),

                sendingErrorTimer: setTimeout(() => {
                    dispatch(sendingErrorAppeared(clientSideId, chatId))
                }, showPreloaderTimeout * 20)
            }))

            const getFilesId = async () => {
                const requests: Promise<number>[] = []

                files.forEach(item => {
                    requests.push(messagesApi.sendFile(chatId, item).then(response => Number(response.id)))
                })

                return await Promise.all<number>(requests)
            }

            const filesId = await getFilesId()

            websocketApi.send(message, chatId, clientSideId, filesId, articles.map(item => item.id))
        } catch (e) {
            console.error('send message', e)
        }
    }

export const removeMessage = (id: number, chatId: number): Thunk => async (dispatch) => {
    dispatch(messageSendingStateChanged(id, chatId, true))
    websocketApi.remove(id, chatId)
}

export const editMessage = (id: number, chatId: number, text: string, files: IFile[], articles: IArticlePreview[]):
    Thunk => async (dispatch) => {
    dispatch(messageSendingStateChanged(id, chatId, true))

    const getFilesId = async () => {
        const requests: Promise<number>[] = []

        files.map(item => {
            if (!item.id) {
                requests.push(messagesApi.sendFile(chatId, item).then(response => Number(response.id)))
            } else {
                requests.push(new Promise((resolve) => resolve(Number(item.id))))
            }
        })

        return await Promise.all<number>(requests)
    }

    const filesId = await getFilesId()

    const articlesId = articles.map(item => item.id)

    websocketApi.edit(id, text, chatId, filesId, articlesId)
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
        await handleTokenExpired(e, () => dispatch(getChatMessages(chatId)))
    }
}

export const editMessagesArticle = (article: IArticlePreview): Thunk => async (dispatch) => {
    dispatch(messageArticleEdited(article))
}