import {State} from '../store/store'

export const selectIsAuth = (state: State) => state.auth.isAuth
export const selectIsAuthError = (state: State) => state.auth.isError
// export const selectToken = (state: State) => state.auth.token
export const selectAuthFetching = (state: State) => state.auth.isFetching