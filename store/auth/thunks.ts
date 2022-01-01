import authApi from '../../api/auth-api'
import {profileReceived, authorized, tokenReceived} from './actions'
import {AuthThunkResult} from './reducer'
import messagesApi from '../../api/messages-api'
import {startMessagesListening} from '../app/thunks'

export const auth = (email: string, password: string): AuthThunkResult => async (dispatch) => {
    try {
        const response = await authApi.auth(email, password)

        dispatch(authorized(true))

        dispatch(getProfile())

        dispatch(tokenReceived(response.access))

        messagesApi.token = response.access

        dispatch(startMessagesListening())
    } catch (e) {
        console.error(e.message)

        dispatch(authorized(false))

        dispatch(tokenReceived(''))
    }
}

export const refreshToken = (): AuthThunkResult => async (dispatch) => {
    try {
        const response = await authApi.refreshToken()

        dispatch(authorized(true))

        dispatch(tokenReceived(response.access))
    } catch (e) {
        console.error(e.message)

        dispatch(authorized(false))

        dispatch(tokenReceived(''))
    }
}

export const getProfile = (): AuthThunkResult => async (dispatch) => {
    try {
        const response = await authApi.getProfile()

        dispatch(profileReceived(response))
    } catch (e) {
        console.error(e.message)
    }
}