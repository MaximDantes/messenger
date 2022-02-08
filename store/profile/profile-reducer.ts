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
                profile: action.payload
            }

        case 'profile/FETCHING_STARTED':
            return {
                ...state,
                isFetching: true
            }

        case 'profile/FETCHING_FINISHED':
            return {
                ...state,
                isFetching: false
            }

        default:
            return state
    }
}

export default profileReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>