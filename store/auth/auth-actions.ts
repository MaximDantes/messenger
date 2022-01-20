import {IProfile} from '../../types/entities'

export const authorized = (isAuth: boolean) => ({
    type: 'auth/AUTHORIZED',
    payload: isAuth
} as const)

export const tokenReceived = (token: string) => ({
    type: 'auth/TOKEN_RECEIVED',
    payload: token
} as const)

export const fetchingStarted = () => ({
    type: 'auth/FETCHING_STARTED'
} as const)

export const fetchingFinished = () => ({
    type: 'auth/FETCHING_FINISHED'
} as const)