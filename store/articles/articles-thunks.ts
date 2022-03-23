import {Thunk} from './articles-reducer'
import {
    articleCreated, articleEdited,
    articleReceived,
    articleRemoved,
    articlesPreviewsReceived,
    fetchingStateChanged
} from './articles-actions'
import articlesApi from '../../api/articles-api'
import {statusCodes} from '../../types/status-codes'
import {IFile} from '../../types/entities'
import handleTokenExpired from '../handle-token-expired'
import {messageArticleEdited} from '../messages/messages-actions'
import {editMessagesArticle} from '../messages/messages-thunks'

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
            await handleTokenExpired(e, () => dispatch(getArticlesPreviews(specialityId, year, subjectId, teacher)))
        } finally {
            dispatch(fetchingStateChanged(false))
        }
    }

export const getArticle = (articleId: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await articlesApi.get(articleId)

        dispatch(articleReceived(response.data))
    } catch (e) {
        console.error('get article', e)
        await handleTokenExpired(e, () => dispatch(getArticle(articleId)))
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
        await handleTokenExpired(e, () => dispatch(removeArticle(articleId)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const createArticle = (title: string, text: string, subjectId: number,
                              year: number, specialityId: number, files: IFile[]): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await articlesApi.create(title, text, subjectId, year, specialityId)

        const sendFiles = async () => {
            files.forEach(item => {
                articlesApi.addFile(response.data.id, item)
            })
        }

        await sendFiles()

        dispatch(articleCreated({id: response.data.id, title: response.data.title}))
    } catch (e) {
        console.error('create article', e)
        await handleTokenExpired(e, () => dispatch(createArticle(title, text, subjectId, year, specialityId, files)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const editArticle = (articleId: number, title: string, text: string, files: IFile[]): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const getFilesId = async () => {
            const requests: Promise<number>[] = []

            files.map(item => {
                if (!item.id) {
                    requests.push(articlesApi.addFile(articleId, item).then(response => Number(response.data.id)))
                } else {
                    requests.push(new Promise((resolve) => resolve(Number(item.id))))
                }
            })

            return await Promise.all<number>(requests)
        }

        const filesId = await getFilesId()

        const response = await articlesApi.edit(articleId, title, text, filesId)

        dispatch(articleEdited(response.data))
        dispatch(editMessagesArticle({id: response.data.id, title: response.data.title}))
    } catch (e) {
        console.error('edit article', e)
        await handleTokenExpired(e, () => dispatch(editArticle(articleId, title, text, files)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}