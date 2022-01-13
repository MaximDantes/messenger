import * as actions from './actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IProfile} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/typescript'

const initialState = {
    isAuth: false,
    token: '',
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

        default:
            return state
    }
}

export default authReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
