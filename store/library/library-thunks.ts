import {Thunk} from './library-reducer'
import libraryApi from '../../api/library-api'
import {fetchingStateChanged, specialitiesReceived, subjectsReceived, teachersReceived} from './library-actions'

export const getSpecialities = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await libraryApi.getSpecialities()

        dispatch(specialitiesReceived(response.data))
    } catch (e) {
        console.error('get specialities', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const getSubjects = (specialityId: number, year: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await libraryApi.getSubjects(specialityId, year)

        dispatch(subjectsReceived(response.data))
    } catch (e) {
        console.error('get library', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const getTeachers = (specialityId: number, year: number, subjectId: number): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await libraryApi.getTeachers(specialityId, year, subjectId)

        dispatch(teachersReceived(response.data))
    } catch (e) {
        console.error('get teachers', e)
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}