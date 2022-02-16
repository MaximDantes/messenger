import {Thunk} from './specialities-reducer'
import specialitiesApi from '../../api/specialities-api'
import {specialitiesReceived} from './specialities-actions'

export const getSpecialities = (): Thunk => async (dispatch) => {
    try {
        const response = await specialitiesApi.get()

        dispatch(specialitiesReceived(response))
    } catch (e) {
        console.error('get specialities', e)
    }
}