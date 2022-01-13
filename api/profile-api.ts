import axiosInstance from './api'
import {IProfile} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {DocumentResult} from 'expo-document-picker'
import {Platform} from 'react-native'

const profileApi = {
    get: async () => {
        const response = await axiosInstance.get<IProfile>('users/me/')

        return snakeToCamel(response.data)
    },

    edit: async (profile: IProfile) => {
        const response = await axiosInstance.get<IProfile>('users/profile/')

        return snakeToCamel(response.data)
    },

    setAvatar: async (file: DocumentResult) => {
        const formData = new FormData()

        if (file.type === 'success') {
            if (Platform.OS === 'web' && file.file) {
                formData.append('avatar', file.file)
            }

            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                formData.append('avatar', {
                    //@ts-ignore
                    name: file.name, type: file.mimeType, uri: file.uri,
                })
            }
        }

        const response = await axiosInstance.post<{avatar: string}>('users/me/avatar', formData)

        return response.data.avatar
    }
}

export default profileApi