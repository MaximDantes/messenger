import * as actions from './auth-actions'
import {ThunkAction} from 'redux-thunk'
import {State} from '../store'
import {IProfile} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/typescript'
import messagesApi from '../../api/websocket-api'

const initialState = {
    isAuth: false,
    token: '',
    isFetching: true,
}

const authReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'auth/AUTHORIZED':
            return {
                ...state,
                isAuth: action.payload
            }

        case 'auth/TOKEN_RECEIVED':
            messagesApi.token = action.payload

            return {
                ...state,
                token: action.payload
            }

        case 'auth/FETCHING_STARTED':
            return {
                ...state,
                isFetching: true
            }

        case 'auth/FETCHING_FINISHED':
            return {
                ...state,
                isFetching: false
            }

        default:
            return state
    }
}

export default authReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
