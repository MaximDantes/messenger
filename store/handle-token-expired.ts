import authApi from '../api/auth-api'

const handleTokenExpired = async (e: Error, callback: Function) => {
    if (e.message === 'TokenExpired') {
        await authApi.refreshToken()

        callback()
    }
}

export default handleTokenExpired