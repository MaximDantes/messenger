export const authorized = (isAuth: boolean) => ({
    type: 'auth/AUTHORIZED',
    payload: isAuth
} as const)

export const logoutSucceed = () => ({
    type: 'auth/LOGOUT_SUCCEED'
} as const)

export const tokenReceived = (token: string) => ({
    type: 'auth/TOKEN_RECEIVED',
    payload: token
} as const)

export const errorStateChanged = (isError: boolean) => ({
    type: 'auth/ERROR_STATE_CHANGED',
    payload: isError
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'auth/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)