import {IProfile} from '../../types/dto'

export const authorized = (isAuth: boolean) => ({
    type: 'auth/AUTHORIZED',
    payload: isAuth
} as const)

export const tokenReceived = (token: string) => ({
    type: 'auth/TOKEN_RECEIVED',
    payload: token
} as const)

export const profileReceived = (profile: IProfile) => ({
    type: 'auth/PROFILE_RECEIVED',
    payload: profile
} as const)