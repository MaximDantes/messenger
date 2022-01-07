import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IProfile} from '../../types/entities'

const initialState = {
    profile: null as IProfile | null,
}

const profileReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'auth/PROFILE_RECEIVED':
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state
    }
}

export default profileReducer

type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type Thunk = ThunkAction<void, State, undefined, Action>