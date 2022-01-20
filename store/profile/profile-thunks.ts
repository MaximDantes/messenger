import {fetchingFinished, fetchingStarted, profileReceived} from './profile-actions'
import {Thunk} from './profile-reducer'
import {IProfile} from '../../types/entities'
import profileApi from '../../api/profile-api'
import {DocumentResult} from 'expo-document-picker'
import {statusCodes} from '../../types/status-codes'

export const getProfile = (): Thunk => async (dispatch) => {
    dispatch(fetchingStarted())

    const response = await profileApi.get()

    if (response.status === statusCodes.success) {
        dispatch(profileReceived(response.data))
    }

    dispatch(fetchingFinished())
}

export const editProfile = (profile: IProfile): Thunk => async (dispatch) => {
    try {
        const response = await profileApi.edit(profile)

        dispatch(profileReceived(response.data))
    } catch (e) {
        console.error(e.message)
    }
}

export const setAvatar = (file: DocumentResult): Thunk => async (dispatch) => {
    dispatch(fetchingStarted())

    await profileApi.setAvatar(file)

    dispatch(getProfile())

}