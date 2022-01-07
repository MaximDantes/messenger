import axiosInstance from './api'
import {IProfile} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'

const profileApi = {
    get: async () => {
        const response = await axiosInstance.get<IProfile>('users/profile/')

        return snakeToCamel(response.data)
    },

    edit: async (profile: IProfile) => {
        const response = await axiosInstance.get<IProfile>('users/profile/')

        return snakeToCamel(response.data)
    },
}

export default profileApi