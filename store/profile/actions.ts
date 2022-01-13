import {IProfile} from '../../types/entities'
import avatar from '../../components/Profile/Avatar'

export const profileReceived = (profile: IProfile) => ({
    type: 'profile/PROFILE_RECEIVED',
    payload: profile
} as const)