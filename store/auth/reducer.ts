import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'

type InferValues<T> = T extends { [key: string]: infer U } ? U : never
export type Action = ReturnType<InferValues<typeof actions>>

export type AuthThunkResult = ThunkAction<void, State, undefined, Action>

const initialState = {
    isAuth: false
}

const authReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'auth/SET_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }

        default:
            return state
    }
}

export default authReducer