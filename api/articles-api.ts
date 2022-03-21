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

        return axiosInstance.get<IArticlePreview[]>(url)
    },

    remove: async (articleId: number) => {
        return await axiosInstance.delete(`wiki/article/${articleId}`)
    },

    create: async (title: string, text: string, subjectId: number, year: number, specialityId: number) => {
        return await axiosInstance.post<IArticle>('wiki/article/', {
            title,
            text,
            subject: subjectId,
            year,
            speciality: specialityId
        })
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
    },

    removeFile: async (articleId: number, fileId: number) => {
        return await axiosInstance.delete(`wiki/article/${articleId}/files/${fileId}`)
    },

    edit: async (articleId: number, title: string, text: string) => {
        return  await axiosInstance.put<IArticle>('wiki/article/', {
            id: articleId,
            title,
            text,
        })
    }
}

export default articlesApi