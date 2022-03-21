import {Thunk} from './files-reducer'
import filesApi from '../../api/files-api'
import {setCursors} from '../chats/chats-thunks'
import {Cursors} from '../chats/chats-reducer'
import {fetchingStateChanged, filesReceived} from './files-actions'
import {IFile} from '../../types/entities'
import {statusCodes} from '../../types/status-codes'
import handleTokenExpired from '../handle-token-expired'

export const getFiles = (chatId: number, type: 'IMG' | 'DOC'): Thunk => async (dispatch, getState) => {
    try {
        dispatch(fetchingStateChanged(true))

        const chat = getState().chats.chats.find(item => item.id === chatId)

        const cursor = type === 'IMG' ? chat?.nextImagesCursor : chat?.nextFilesCursor
        const storeFiles = getState().files.files.filter(item => item.fileType === type)

        if (!cursor && storeFiles.length !== 0) return

        const response = await filesApi.get(chatId, type, cursor)

        const cursors: Cursors = {}

        type === 'IMG'
            ? cursors.nextImages = (response.data.next || '')
            : cursors.nextFiles = (response.data.next || '')

        dispatch(setCursors(cursors, chatId))

        const files: IFile[] = response.data.results.map(item => ({
            ...item, chatId
        }))

        dispatch(filesReceived(files))
    } catch (e) {
        console.error('get files', e)
        await handleTokenExpired(e, () => dispatch(getFiles(chatId, type)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}