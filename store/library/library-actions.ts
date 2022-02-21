import {ISpeciality, ISubject, ITeacher} from '../../types/entities'

export const specialitiesReceived = (specialities: ISpeciality[]) => ({
    type: 'library/SPECIALITIES_RECEIVED',
    payload: specialities
} as const)

export const subjectsReceived = (subjects: ISubject[]) => ({
    type: 'library/SUBJECTS_RECEIVED',
    payload: subjects
} as const)

export const teachersReceived = (teachers: ITeacher[]) => ({
    type: 'library/TEACHERS_RECEIVED',
    payload: teachers
} as const)

export const fetchingStateChanged = (isFetching: boolean) => ({
    type: 'library/FETCHING_STATE_CHANGED',
    payload: isFetching
} as const)
