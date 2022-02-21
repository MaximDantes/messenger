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