import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import * as actions from './library-actions'
import {ISpeciality, ISubject, ITeacher} from '../../types/entities'

const initialState = {
    specialities: [] as ISpeciality[],
    subjects: [] as ISubject[],
    teachers: [] as ITeacher[],
    isFetching: false
}

const libraryReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'library/SPECIALITIES_RECEIVED':
            return {
                ...state,
                specialities: action.payload
            }

        case 'library/SUBJECTS_RECEIVED': {
            return {
                ...state,
                subjects: action.payload
            }
        }

        case 'library/TEACHERS_RECEIVED':
            return {
                ...state,
                teachers: action.payload
            }

        case 'library/FETCHING_STATE_CHANGED':
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return state
    }
}

export default libraryReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>