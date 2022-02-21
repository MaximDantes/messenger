import {State} from '../store'

export const selectIsAuth = (state: State) => state.auth.isAuth

export const selectIsAuthError = (state: State) => state.auth.isError

export const selectAuthFetching = (state: State) => state.auth.isFetching