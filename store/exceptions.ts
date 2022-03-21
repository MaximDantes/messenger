export const TokenExpiredException = () => {
    return new Error('TokenExpired')
}

export enum ErrorMessages {
    loginIsAlreadyExists = 'User with this email is already exists',
    invalidCode = 'invalid code',
    noAccountWithThisEmail = 'no account found with this email',
    wrongOldPassword = 'wrong old password',
}