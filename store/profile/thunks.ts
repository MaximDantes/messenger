import {profileReceived} from './actions'
import {Thunk} from './reducer'
import {IProfile} from '../../types/entities'
import profileApi from '../../api/profile-api'
import {DocumentResult} from 'expo-document-picker'

export const getProfile = (): Thunk => async (dispatch) => {
    try {
        const response = await profileApi.get()

        dispatch(profileReceived(response))
    } catch (e) {
        console.error(e.message)
    }
}

export const editProfile = (profile: IProfile): Thunk => async (dispatch) => {
    try {
        const response = await profileApi.edit(profile)

        dispatch(profileReceived(response))
    } catch (e) {
        console.error(e.message)
    }
}

export const setAvatar = (file: DocumentResult): Thunk => async (dispatch) => {
    try {
        await profileApi.setAvatar(file)

        dispatch(getProfile())
    } catch (e) {
        console.error(e)
    }
}