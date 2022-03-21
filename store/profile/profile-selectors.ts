import {State} from '../store'

export const selectProfile = (state: State) => state.profile.profile

// export const selectEmailError = (state: State) => state.profile.emailError
//
// export const selectEmailChanged = (state: State) => state.profile.emailChanged
//
// export const selectPasswordRestored = (state: State) => state.profile.passwordRestored

export const selectProfileNavigation = (state: State) => state.profile.navigation

export const selectProfileErrors = (state: State) => state.profile.errors

export const selectEmailForVerification = (state: State) => state.profile.emailForVerification

export const selectProfileFetching = (state: State) => state.profile.isFetching