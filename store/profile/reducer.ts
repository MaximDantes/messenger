import * as actions from './actions'
import {IProfile} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/typescript'

const initialState = {
    profile: null as IProfile | null,
}

const profileReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'profile/PROFILE_RECEIVED':
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state
    }
}

export default profileReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>