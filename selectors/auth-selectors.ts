import {State} from '../store/store'

export const selectToken = (state: State) => state.auth.token

export const selectCurrentUserProfile = (state: State) => state.auth.profile