import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IProfile} from '../../types/dto'

type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type AuthThunkResult = ThunkAction<void, State, undefined, Action>

const initialState = {
    isAuth: false,
    token: '',
    profile: null as IProfile | null,
}

const authReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'auth/AUTHORIZED':
            return {
                ...state,
                isAuth: action.payload
            }

        case 'auth/TOKEN_RECEIVED':
            return {
                ...state,
                token: action.payload
            }

        case 'auth/PROFILE_RECEIVED':
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state
    }
}

export default authReducer