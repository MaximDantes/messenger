import * as actions from './files-actions'
import {ActionTemplate, ThunkTemplate} from '../../types/redux'
import {IFile} from '../../types/entities'
import excludeSameId from '../../utilits/exclude-same-id'

const initialState = {
    files: [] as IFile[]
}

const filesReducer = (state = initialState, action: Action): typeof initialState => {
    switch (action.type) {
        case 'files/FILES_RECEIVED':
            return {
                ...state,
                files: excludeSameId([...state.files, ...action.payload])
            }

        default:
            return state
    }
}

export default filesReducer

export type Action = ActionTemplate<typeof actions>
export type Thunk = ThunkTemplate<Action>
