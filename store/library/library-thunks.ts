import {Thunk} from './library-reducer'
import libraryApi from '../../api/library-api'
import {fetchingStateChanged, specialitiesReceived, subjectsReceived, teachersReceived} from './library-actions'
import handleTokenExpired from '../handle-token-expired'

export const getSpecialities = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await libraryApi.getSpecialities()

        dispatch(specialitiesReceived(response.data))
    } catch (e) {
        console.error('get specialities', e)
        await handleTokenExpired(e, () => dispatch(getSpecialities()))
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
        await handleTokenExpired(e, () => dispatch(getSubjects(specialityId, year)))
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
        await handleTokenExpired(e, () => dispatch(getTeachers(specialityId, year, subjectId)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}