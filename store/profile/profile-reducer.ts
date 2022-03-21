import * as actions from './profile-actions'
import {IProfile} from '../../types/entities'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'

const initialState = {
    profile: null as IProfile | null,
    emailForVerification: '',
    isFetching: false,

    navigation: {
        emailCodeSent: false,
        codeConfirmed: false,
        passwordCodeSent: false,
        passwordCodeConfirmed: false,
        passwordChanged: false,
    },

    errors: {
        email: '',
        code: '',
        password: '',
    }
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
                    ...action.payload
                } : null
            }

        case 'profile/AVATAR_EDITED':
            return {
                ...state,
                profile: state.profile ? {
                    ...state.profile,
                    avatar: action.payload
                } : null
            }

        case 'profile/ERROR_APPEARED':
            switch (action.payload.type) {
                case 'email':
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            email: action.payload.error
                        }
                    }

                case 'code':
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            code: action.payload.error
                        }
                    }

                case 'password':
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            password: action.payload.error
                        }
                    }

                default:
                    return state
            }

        case 'profile/EMAIL_FOR_VERIFICATION_CHANGED':
            return {
                ...state,
                emailForVerification: action.payload,
                navigation: {
                    ...state.navigation,
                    emailCodeSent: !!action.payload
                }
            }

        case 'profile/CODE_CONFIRMED':
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    codeConfirmed: action.payload
                }
            }

        case 'profile/PASSWORD_CODE_SENT':
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    passwordCodeSent: action.payload
                }
            }

        case 'profile/PASSWORD_CHANGED':
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    passwordChanged: action.payload
                }
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