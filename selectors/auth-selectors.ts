import {State} from '../store/store'

export const selectToken = (state: State) => state.auth.token
export const selectIsAuth = (state: State) => state.auth.isAuth
export const selectAuthFetching = (state: State) => state.auth.isFetching