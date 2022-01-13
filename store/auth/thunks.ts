import authApi from '../../api/auth-api'
import {authorized, tokenReceived} from './actions'
import {Thunk} from './reducer'
import messagesApi from '../../api/websocket-api'
import {startMessagesListening} from '../chats/thunks'
import {getProfile} from '../profile/thunks'

export const auth = (email: string, password: string): Thunk => async (dispatch) => {
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

export const refreshToken = (): Thunk => async (dispatch) => {
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