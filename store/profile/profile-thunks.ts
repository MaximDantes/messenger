import {
    avatarEdited,
    errorAppeared, codeConfirmed, emailForVerificationChanged,
    fetchingStateChanged,
    profileEdited,
    profileReceived, passwordCodeSent, passwordChanged
} from './profile-actions'
import {Thunk} from './profile-reducer'
import profileApi from '../../api/profile-api'
import {DocumentResult} from 'expo-document-picker'
import {statusCodes} from '../../types/status-codes'
import {IProfileInfo} from '../../types/entities'
import handleTokenExpired from '../handle-token-expired'
import {ErrorMessages} from '../exceptions'

export const getProfile = (): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await profileApi.get()

        if (response.status === statusCodes.success) {
            dispatch(profileReceived(response.data))
        }
    } catch (e) {
        console.error('get profile', e)
        await handleTokenExpired(e, () => dispatch(getProfile()))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const editProfile = (profileInfo: IProfileInfo): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        await profileApi.edit(profileInfo)

        dispatch(profileEdited(profileInfo))
    } catch (e) {
        console.error('edit profile', e)
        await handleTokenExpired(e, () => dispatch(editProfile(profileInfo)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const setAvatar = (file: DocumentResult): Thunk => async (dispatch) => {
    try {
        dispatch(fetchingStateChanged(true))

        const response = await profileApi.setAvatar(file)

        if (response.status === statusCodes.success) {
            dispatch(avatarEdited(response.data.avatar))
        }
    } catch (e) {
        console.error('set avatar', e)
        await handleTokenExpired(e, () => dispatch(setAvatar(file)))
    } finally {
        dispatch(fetchingStateChanged(false))
    }
}

export const changePassword = (oldPassword: string, newPassword: string): Thunk => async (dispatch) => {
    try {
        await profileApi.changePassword(oldPassword, newPassword)

        dispatch(passwordChanged(true))
    } catch (e) {
        console.error('password change', e)

        if (e.message === ErrorMessages.wrongOldPassword) {
            dispatch(errorAppeared('Неверно введен старый пароль', 'password'))
        }

        await handleTokenExpired(e, () => dispatch(changePassword(oldPassword, newPassword)))
    }
}

export const changeEmail = (email: string): Thunk => async (dispatch) => {
    try {
        await profileApi.changeEmail(email)

        dispatch(emailForVerificationChanged(email))
    } catch (e) {
        console.error('email change', e)

        if (e.message === ErrorMessages.loginIsAlreadyExists) {
            dispatch(errorAppeared('Пользователь с таким email уже существует', 'email'))
        }

        await handleTokenExpired(e, () => dispatch(changeEmail(email)))
    }
}

export const sendEmailCode = (code: string): Thunk => async (dispatch) => {
    try {
        await profileApi.sendEmailCode(code)

        dispatch(codeConfirmed(true))
    } catch (e) {
        console.error('send email code', e)

        if (e.message === ErrorMessages.invalidCode) {
            dispatch(errorAppeared('Неверный код', 'code'))
        }

        await handleTokenExpired(e, () => dispatch(sendEmailCode(code)))
    }
}

export const restorePassword = (email: string): Thunk => async (dispatch) => {
    try {
        await profileApi.restorePassword(email)

        dispatch(passwordCodeSent(true))
    } catch (e) {
        console.error('restore password', e)

        if (e.message === ErrorMessages.noAccountWithThisEmail) {
            dispatch(errorAppeared('Аккаунта с таким email не существует', 'email'))
        }
    }
}

export const sendPasswordCode = (code: string, email: string): Thunk => async (dispatch) => {
    try {
        await profileApi.sendPasswordCode(code, email)

        dispatch(codeConfirmed(true))
    } catch (e) {
        console.error('send password code', e)

        if (e.message === ErrorMessages.invalidCode) {
            dispatch(errorAppeared('Неверный код', 'code'))
        }
    }
}

export const setPassword = (password: string, email: string): Thunk => async (dispatch) => {
    try {
        await profileApi.setNewPassword(password, email)

        dispatch(passwordChanged(true))
    } catch (e) {
        console.error('set new password', e)

        await handleTokenExpired(e, () => dispatch(setPassword(password, email)))
    }
}
