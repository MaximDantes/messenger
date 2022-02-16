import * as actions from './auth-actions'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import messagesApi from '../../api/websocket-api'

const initialState = {
    isAuth: false,
    isError: false,
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

        case 'auth/LOGOUT_SUCCEED':
            return {
                ...state,
                isAuth: false
            }

        case 'auth/TOKEN_RECEIVED':
            messagesApi.token = action.payload

            return {
                ...state,
                token: action.payload
            }

        case 'auth/ERROR_STATE_CHANGED':
            return {
                ...state,
                isError: action.payload
            }

        case 'auth/FETCHING_STATE_CHANGED':
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return state
    }
}

export default authReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
