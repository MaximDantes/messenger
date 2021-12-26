export const _setAuth = (isAuth: boolean) => ({
    type: 'auth/SET_AUTH',
    payload: isAuth
} as const)