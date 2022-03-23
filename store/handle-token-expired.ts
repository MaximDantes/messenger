import authApi from '../api/auth-api'
import {ErrorMessages} from './exceptions'

const handleTokenExpired = async (e: Error, callback: Function) => {
    if (e.message === ErrorMessages.tokenExpired) {
        await authApi.refreshToken()

        callback()
    }
}

export default handleTokenExpired