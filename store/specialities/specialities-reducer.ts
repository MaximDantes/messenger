import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import * as actions from './specialities-actions'
import {ISpeciality} from '../../types/entities'

const initialState = {
    specialities: [] as ISpeciality[]
}

const specialitiesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'specialities/SPECIALITIES_RECEIVED':
            return {
                ...state,
                specialities: action.payload
            }

        default:
            return state
    }
}

export default specialitiesReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>