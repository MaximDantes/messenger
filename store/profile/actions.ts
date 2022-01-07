import {IProfile} from '../../types/entities'

export const profileReceived = (profile: IProfile) => ({
    type: 'auth/PROFILE_RECEIVED',
    payload: profile
} as const)