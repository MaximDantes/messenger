import {Thunk} from './articles-reducer'
import {
    articleCreated,
    articleReceived,
    articleRemoved,
    articlesPreviewsReceived,
    fetchingStateChanged
} from './articles-actions'
import articlesApi from '../../api/articles-api'
import {statusCodes} from '../../types/status-codes'
import store from '../store'
import {IFile} from '../../types/entities'
import messagesApi from '../../api/messages-api'

export const getArticlesPreviews = (specialityId: number, year: number, subjectId: number, teacher?: string): Thunk =>
    async (dispatch) => {
        try {
            dispatch(fetchingStateChanged(true))

            const response = await articlesApi.getPreviews(specialityId, year, subjectId, teacher)

            if (response.status === statusCodes.success) {
                dispatch(articlesPreviewsReceived(response.data))
            }
        } catch (e) {
            console.error('get articles previews', e)
        } finally {
            dispatch(fetchingStateChanged(false))
        }
    }

export const getArticle = (articleId: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await articlesApi.get(articleId)

        if (response.status === statusCodes.success) {
            dispatch(articleReceived(response.data))
        }
    } catch (e) {
        console.error('get article', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const removeArticle = (articleId: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        await articlesApi.remove(articleId)

        dispatch(articleRemoved(articleId))
    } catch (e) {
        console.error('remove article', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const createArticle = (title: string, text: string, subjectId: number,
                              year: number, specialityId: number, files: IFile[]): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await articlesApi.create(title, text, subjectId, year, specialityId)

        //TODO load all files
        const sendFiles = async () => {
            files.forEach(item => {
                articlesApi.addFile(response.data.id, item)
            })
        }

        await sendFiles()

        dispatch(articleCreated({id: response.data.id, title: response.data.title}))
    } catch (e) {
        console.error('create article', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}