import * as actions from './profile-actions'
import {IProfile} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'

const initialState = {
    profile: null as IProfile | null,
    isFetching: false,
}

const profileReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'profile/PROFILE_RECEIVED':
            return {
                ...state,
                profile: action.payload,
            }

        case 'profile/PROFILE_EDITED':
            return {
                ...state,
                profile: state.profile ? {
                    ...state.profile,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                } : null
            }

        case 'profile/AVATAR_EDITED':
            console.log(action.payload)
            return {
                ...state,
                profile: state.profile ? {
                    ...state.profile,
                    avatar: action.payload
                } : null
            }

        case 'profile/FETCHING_STATE_CHANGED':
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return state
    }
}

export default profileReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>