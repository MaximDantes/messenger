import {IProfile} from '../../types/entities'

export const authorized = (isAuth: boolean) => ({
    type: 'auth/AUTHORIZED',
    payload: isAuth
} as const)

export const tokenReceived = (token: string) => ({
    type: 'auth/TOKEN_RECEIVED',
    payload: token
} as const)