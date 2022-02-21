import {IArticle, IArticlePreview} from '../types/entities'
import axiosInstance from './api'

const articlesApi = {
    get: async (articleId: number) => {
        const response = await axiosInstance.get<IArticle>(`wiki/article/${articleId}`)

        return {
            data: {
                ...response.data,
                id: articleId
            },
            status: response.status
        }
    },

    getPreviews: async (specialityId: number, year: number, subjectId: number, teacher?: string) => {
        let url = `wiki/specialities/${specialityId}/years/${year}/subjects/${subjectId}/articles`
        if (teacher) {
            url += `?teacher=${teacher}`
        }

        const response = axiosInstance.get<IArticlePreview[]>(url)

        return response
    },
}

export default articlesApi