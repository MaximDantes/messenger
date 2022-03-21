import axiosInstance from './api'
import {IProfile, IProfileInfo} from '../types/entities'
import {snakeToCamel} from '../utilits/case-convert'
import {DocumentResult} from 'expo-document-picker'
import {Platform} from 'react-native'
import {ErrorMessages} from '../store/exceptions'

const profileApi = {
    get: async () => {
        const response = await axiosInstance.get<IProfile>('users/me')

        //TODO remove mock
        return {
            data: snakeToCamel<IProfile>({...response.data, newAccount: false, subjects: [1]}),
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

        return await axiosInstance.post<{ avatar: string }>('users/me/avatar/', formData)
    },

    changePassword: async (oldPassword: string, newPassword: string) => {
        const response = await axiosInstance.patch('users/me/password/', {
            old_password: oldPassword,
            new_password: newPassword
        })

        if (!response) throw Error(ErrorMessages.wrongOldPassword)
    },

    setNewPassword: async (password: string) => {
        await axiosInstance.patch('users/me/password/', {
            old_password: 'some password',
            new_password: password
        })
    },

    changeEmail: async (email: string) => {
        const response = await axiosInstance.post('users/me/email/', {email})

        if (!response) throw Error(ErrorMessages.loginIsAlreadyExists)
    },

    sendEmailCode: async (code: string) => {
        const response = await axiosInstance.post<{ email: string }>('users/me/email/verification/', {code})

        if (!response) throw Error(ErrorMessages.invalidCode)
    },

    restorePassword: async (email: string) => {
        const response = await axiosInstance.post('users/password/', {email})

        if (!response) throw Error(ErrorMessages.noAccountWithThisEmail)
    },

    sendPasswordCode: async (code: string, email: string) => {
        const response = await axiosInstance.post<{ email: string }>('users/password/verification/', {email, code})

        if (!response) throw Error(ErrorMessages.invalidCode)
    },
}

export default profileApi