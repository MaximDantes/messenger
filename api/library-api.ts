import {ISpeciality, ISubject, ITeacher} from '../types/entities'
import axiosInstance from './api'
import {snakeToCamel} from '../utilits/case-convert'

const libraryApi = {
    //TODO years refactor
    getSpecialities: async (): Promise<{data: ISpeciality[], status: number}> => {
        const response = await axiosInstance.get<Array<{ abbreviation: string, id: number,
            years: Array<{year: number}> }>>('wiki/specialities')

        return {
            data: response.data.map(item => ({
                ...item,
                years: item.years[0]?.year || 0
            })),
            status: response.status
        }
    },

    getSubjects: async (specialityId: number, year: number) => {
        return await axiosInstance.get<ISubject[]>(`wiki/specialities/${specialityId}/years/${year}/subjects`)
    },

    getTeachers: async (specialityId: number, year: number, subjectId: number) => {
        const response = await axiosInstance
            .get(`wiki/specialities/${specialityId}/years/${year}/subjects/${subjectId}/teachers`)

        return {
            data: snakeToCamel<ITeacher[]>(response.data),
            status: response.status
        }
    }
}

export default libraryApi