import {IArticle} from '../types/entities'

const articlesApi = {
    get: async (specialityId: number, courseId: number, teacherId?: number): Promise<IArticle[]> => {
        await setTimeout(() => {}, 1000)

        return [
            {id: 1, courseId: 1, specialityId: 1, teacherId: 1, title: 'pofrekok;lkvrfefefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 2, courseId: 1, specialityId: 1, teacherId: 1, title: 'pofeffrekok;lkvrefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 3, courseId: 1, specialityId: 1, teacherId: 1, title: 'pofefefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 4, courseId: 2, specialityId: 2, teacherId: 1, title: 'buffrekok;lkvrefefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 5, courseId: 2, specialityId: 2, teacherId: 1, title: 'bufeffrekok;lkvrefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 6, courseId: 2, specialityId: 2, teacherId: 1, title: 'bufefeffrekok;lkvre', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 7, courseId: 3, specialityId: 3, teacherId: 1, title: 'efefrekok;lkvrfefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 8, courseId: 3, specialityId: 3, teacherId: 1, title: 'efefefefrekok;lkvr', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
            {id: 9, courseId: 3, specialityId: 3, teacherId: 1, title: 'effrekok;lkvrefefe', description: 'feriojfewifjewif fjeiuj fkjnfejij nneksj;kjafksiojfe', files: []},
        ]
    },
}

export default articlesApi