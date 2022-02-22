import axiosInstance from './api'
import {IProfile, IProfileInfo} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {DocumentResult} from 'expo-document-picker'
import {Platform} from 'react-native'

const profileApi = {
    get: async () => {
        const response = await axiosInstance.get<IProfile>('users/me')

        return {
            data: {
                ...snakeToCamel<IProfile>(response.data),
            } as IProfile,
            status: response.status
        }
    },

    edit: async (profileInfo: IProfileInfo) => {
        const response = await axiosInstance.patch('users/me/', {
            first_name: profileInfo.firstName,
            last_name: profileInfo.lastName,
            phone_number: profileInfo.phoneNumber,
            phone_publicity: profileInfo.phonePublicity,
        })

        return {
            data: snakeToCamel<IProfileInfo>(response.data),
            status: response.status
        }
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

        const response = await axiosInstance.post<{ avatar: string }>('users/me/avatar/', formData)

        return response
    },

    changePassword: async (oldPassword: string, newPassword: string) => {
        const response = await axiosInstance.patch('users/me/password/', {
            old_password: oldPassword,
            new_password: newPassword
        })

        return response
    }
}

export default profileApi