export const snakeToCamel = (obj: Object) => {
    const array = JSON.stringify(obj)
        .split('_')

    const parsedString = array
        .map(item => item.slice(0, 1).toUpperCase() + item.slice(1))
        .join('')

    return JSON.parse(parsedString)
}