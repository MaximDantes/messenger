//TODO refactor

const toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    })
}

const isArray = function (a: any) {
    return Array.isArray(a)
}

const isObject = function (o: any) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

export const snakeToCamel = <T>(o: any): T => {
    if (isObject(o)) {
        const n = {}

        Object.keys(o)
            .forEach((k) => {
                //@ts-ignore
                n[toCamel(k)] = snakeToCamel(o[k])
            })

        return n as T
    } else if (isArray(o)) {
        return o.map((i: any) => {
            return snakeToCamel(i)
        })
    }

    return o
}
