import {Thunk} from './files-reducer'
import filesApi from '../../api/files-api'
import {setCursors} from '../chats/chats-thunks'
import {Cursors} from '../chats/chats-reducer'
import {filesReceived} from './files-actions'
import {IFile} from '../../types/entities'
import store from '../store'
import {statusCodes} from '../../types/status-codes'

export const getFiles = (chatId: number, type: 'IMG' | 'DOC'): Thunk => async (dispatch) => {
    try {
        const chat = store.getState().chats.chats.find(item => item.id === chatId)

        const cursor = type === 'IMG' ? chat?.nextImagesCursor : chat?.nextFilesCursor

        const response = await filesApi.get(chatId, type, cursor)
        if (response.status !== statusCodes.success) throw Error(response.statusText)

        const cursors: Cursors = {}
        if (response.data.next) {
            type === 'IMG'
                ? cursors.nextImages = response.data.next
                : cursors.nextFiles = response.data.next
        }

        dispatch(setCursors(cursors, chatId))

        const files: IFile[] = response.data.results.map(item => ({
            ...item, chatId
        }))

        dispatch(filesReceived(files))
    } catch (e) {
        console.error(e)
    }
}