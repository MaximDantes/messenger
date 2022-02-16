import {Thunk} from './articles-reducer'
import {articlesReceived} from './articles-actions'
import articlesApi from '../../api/articles-api'

export const getArticles = (specialityId: number, courseId: number, teacherId?: number): Thunk => async (dispatch) => {
    try {
        const response = await articlesApi.get(specialityId, courseId, teacherId)

        dispatch(articlesReceived(response))
    } catch (e) {
        console.error('get articles', e)
    }
}