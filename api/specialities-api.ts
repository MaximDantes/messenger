import {ISpeciality} from '../types/entities'
import axiosInstance from './api'

const specialitiesApi = {
    get: async (): Promise<ISpeciality[]> => {
        const response = await axiosInstance.get<ISpeciality[]>('wiki/specialities')

        return response.data
        // await setTimeout(() => {}, 1000)
        //
        // return [
        //     {id: 1, title: 'Программирование'},
        //     {id: 2, title: 'Бухалтерсикй учет'},
        //     {id: 3, title: 'Экономика'},
        // ]
    }
}

export default specialitiesApi