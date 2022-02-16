import {avatarEdited, fetchingStateChanged, profileEdited, profileReceived} from './profile-actions'
import {Thunk} from './profile-reducer'
import profileApi from '../../api/profile-api'
import {DocumentResult} from 'expo-document-picker'
import {statusCodes} from '../../types/status-codes'

export const getProfile = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await profileApi.get()

        if (response.status === statusCodes.success) {
            dispatch(profileReceived(response.data))
        }
    } catch (e) {
        console.error('get profile', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const editProfile = (firstName: string, lastName: string): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await profileApi.edit(firstName, lastName)

        if (response.status === statusCodes.success) {
            dispatch(profileEdited(response.data.firstName, response.data.lastName))
        }
    } catch (e) {
        console.error('edit profile', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const setAvatar = (file: DocumentResult): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await profileApi.setAvatar(file)

        if (response.status === statusCodes.success) {
            dispatch(avatarEdited(response.data.avatar))
        }
    } catch (e) {
        console.error('set avatar', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const changePassword = (oldPassword: string, newPassword: string): Thunk => async (dispatch) => {
    try {
        const response = await profileApi.changePassword(oldPassword, newPassword)
    } catch (e) {
        console.error('password change', e)
    }
}