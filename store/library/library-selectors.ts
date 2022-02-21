import {State} from '../store'

export const selectSpecialities = (state: State) => state.library.specialities

export const selectSubjects = (state: State) => state.library.subjects

export const selectTeachers = (state: State) => state.library.teachers

export const selectLibraryFetching = (state: State) => state.library.isFetching