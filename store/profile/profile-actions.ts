import {IProfile, IProfileInfo} from '../../types/entities'

export const profileReceived = (profile: IProfile | null) => ({
    type: 'profile/PROFILE_RECEIVED',
    payload: profile
} as const)

export const profileEdited = (profileInfo: IProfileInfo) => ({
    type: 'profile/PROFILE_EDITED',
    payload: profileInfo
} as const)

export const avatarEdited = (avatar: string) => ({
    type: 'profile/AVATAR_EDITED',
    payload: avatar
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'profile/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)

export const emailForVerificationChanged = (email: string) => ({
    type: 'profile/EMAIL_FOR_VERIFICATION_CHANGED',
    payload: email
} as const)

export const errorAppeared = (error: string, type: 'email' | 'code' | 'password') => ({
    type: 'profile/ERROR_APPEARED',
    payload: {error, type}
} as const)

export const codeConfirmed = (value: boolean) => ({
    type: 'profile/CODE_CONFIRMED',
    payload: value
} as const)

export const passwordCodeSent = (value: boolean) => ({
    type: 'profile/PASSWORD_CODE_SENT',
    payload: value
} as const)

export const passwordChanged = (value: boolean) => ({
    type: 'profile/PASSWORD_CHANGED',
    payload: value
} as const)