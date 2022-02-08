import authApi from '../../api/auth-api'
import {authorized, fetchingFinished, fetchingStarted, tokenReceived} from './auth-actions'
import {Thunk} from './auth-reducer'
import {getProfile} from '../profile/profile-thunks'
import {statusCodes} from '../../types/status-codes'
import {startMessagesListening} from '../messages/messages-thunks'

export const auth = (email: string, password: string): Thunk => async (dispatch) => {
    try {
        const response = await authApi.auth(email, password)

        dispatch(authorized(true))

        dispatch(getProfile())

        dispatch(tokenReceived(response.access))

        dispatch(startMessagesListening())
    } catch (e) {
        console.error(e.message)

        dispatch(authorized(false))

        dispatch(tokenReceived(''))
    }
}

export const refreshToken = (): Thunk => async (dispatch) => {
    const response = await authApi.refreshToken()

    if (response.status === statusCodes.success) {
        dispatch(authorized(true))
        dispatch(tokenReceived(response.data.access))
    } else {
        dispatch(authorized(false))
        dispatch(tokenReceived(''))
    }
}

export const checkAuth = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStarted())

        const response = await authApi.refreshToken()

        if (response.status === statusCodes.success) {
            dispatch(getProfile())
            dispatch(authorized(true))
            dispatch(tokenReceived(response.data.access))
            dispatch(startMessagesListening())
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(fetchingFinished())
    }

}