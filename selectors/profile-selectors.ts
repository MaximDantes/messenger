import {State} from '../store/store'

export const selectProfile = (state: State) => state.profile.profile
export const selectProfileFetching = (state: State) => state.profile.isFetching