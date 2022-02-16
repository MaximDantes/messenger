import {IProfile} from '../../types/entities'

export const profileReceived = (profile: IProfile | null) => ({
    type: 'profile/PROFILE_RECEIVED',
    payload: profile
} as const)

export const profileEdited = (firstName: string, lastName: string) => ({
    type: 'profile/PROFILE_EDITED',
    payload: {firstName, lastName}
} as const)

export const avatarEdited = (avatar: string) => ({
    type: 'profile/AVATAR_EDITED',
    payload: avatar
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'profile/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)