import {IProfile} from '../../types/entities'

export const profileReceived = (profile: IProfile) => ({
    type: 'profile/PROFILE_RECEIVED',
    payload: profile
} as const)

export const fetchingStarted = () => ({
    type: 'profile/FETCHING_STARTED'
} as const)

export const fetchingFinished = () => ({
    type: 'profile/FETCHING_FINISHED'
} as const)