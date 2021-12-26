import authApi from '../../api/auth-api'
import {_setAuth} from './actions'
import {AuthThunkResult} from './reducer'
import usersApi from '../../api/users-api'
import clearCookie from '../../utilits/clearCookie'

export const auth = (email: string, password: string): AuthThunkResult => async (dispatch) => {
    try {
        const response = await authApi.auth(email, password)

        dispatch(_setAuth(true))

        dispatch(getUser(1))
    } catch (e) {
        console.error(e)
        dispatch(_setAuth(false))
    }
}

export const getUser = (userId: number): AuthThunkResult => async (dispatch) => {
    try {
        const response = await usersApi.get(userId)

        console.log(response)
    } catch (e) {
        console.error(e)
    }
}