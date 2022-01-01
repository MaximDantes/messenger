export const clearCookie = () => {
    document.cookie
        .split(';')
        .forEach((c) => {
            document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
        })
}

export const randomString = () => {
    const source = 'abcdefghijklmnopqrstuvwxyz'
    let result = ''

    const length = Math.floor(Math.random() * 50) + 10

    while (result.length < length) {
        result += source[Math.floor(Math.random() * source.length)]
    }

    return result
}