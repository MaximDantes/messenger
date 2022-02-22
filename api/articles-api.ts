import {IArticle, IArticlePreview, IFile} from '../types/entities'
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

    remove: async (articleId: number) => {
        return await axiosInstance.delete(`wiki/article/${articleId}`)
    },

    create: async (title: string, text: string, subjectId: number, year: number, specialityId: number) => {
        const response = await axiosInstance.post<IArticle>('wiki/article/', {
            title,
            text,
            subject: subjectId,
            year,
            speciality: specialityId
        })

        return response
    },

    addFile: async (articleId: number, file: IFile) => {
        const formData = new FormData()

        if (file.fileData) {
            formData.append('file', file.fileData)
        } else {
            formData.append('file', {
                //TODO remove ts ignore
                //@ts-ignore
                name: file.fileName, type: file.fileType, uri: file.file,
            })
        }

        return await axiosInstance.post<IFile>(`wiki/article/${articleId}/files/`, formData)
    }
}

export default articlesApi