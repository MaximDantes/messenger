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
import {IFile} from '../../types/entities'
import handleTokenExpired from '../handle-token-expired'
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
        await handleTokenExpired(e, () => dispatch(createArticle(title, text, subjectId, year, specialityId, files)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const editArticle = (articleId: number, title: string, text: string, files: IFile[]): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        // const sendFiles = async () => {
        //     files.forEach(item => {
        //         if (!item.id) {
        //             articlesApi.addFile(response.data.id, item)
        //         } else {}
        //     })
        // }
        //
        // await sendFiles()

        await articlesApi.edit(articleId, title, text)
    } catch (e) {
        console.error('edit article, e')
        await handleTokenExpired(e, () => dispatch(editArticle(articleId, title, text, files)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}