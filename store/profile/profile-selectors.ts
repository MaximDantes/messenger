import {State} from '../store'

export const selectProfile = (state: State) => state.profile.profile
export const selectProfileFetching = (state: State) => state.profile.isFetching