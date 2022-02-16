import authApi from '../../api/auth-api'
import {
    authorized,
    errorStateChanged,
    fetchingStateChanged,
    logoutSucceed,
    tokenReceived
} from './auth-actions'
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

        dispatch(errorStateChanged(false))
    } catch (e) {
        console.error('auth', e)
        dispatch(errorStateChanged(true))
    }
}

export const logout = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await authApi.logout()

        if (response.status === statusCodes.success) {
            dispatch(logoutSucceed())
        }
    } catch (e) {
        console.error('logout', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const refreshToken = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await authApi.refreshToken()

        if (response.status === statusCodes.success) {
            dispatch(authorized(true))
            dispatch(tokenReceived(response.data.access))
        }
    } catch (e) {
        console.error('refresh token', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const checkAuth = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await authApi.refreshToken()

        if (response.status === statusCodes.success) {
            dispatch(getProfile())
            dispatch(authorized(true))
            dispatch(tokenReceived(response.data.access))
            dispatch(startMessagesListening())
        }
    } catch (e) {
        console.error('check auth', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}