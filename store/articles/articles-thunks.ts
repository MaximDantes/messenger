import {Thunk} from './articles-reducer'
import {articleReceived, articlesPreviewsReceived} from './articles-actions'
import articlesApi from '../../api/articles-api'
import {statusCodes} from '../../types/status-codes'
import store from '../store'

export const getArticlesPreviews = (specialityId: number, year: number, subjectId: number, teacher?: string): Thunk =>
    async (dispatch) => {
    try {
        const response = await articlesApi.getPreviews(specialityId, year, subjectId, teacher)

        if (response.status === statusCodes.success) {
            dispatch(articlesPreviewsReceived(response.data))
        }
    } catch (e) {
        console.error('get articles previews', e)
    }
}

export const getArticle = (articleId: number): Thunk => async (dispatch) => {
    try {
        const response = await articlesApi.get(articleId)

        if (response.status === statusCodes.success) {
            dispatch(articleReceived(response.data))
        }
    } catch (e) {
        console.error('get article', e)
    }
}