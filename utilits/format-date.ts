export const getMonthName = (month: number) => {
    const names = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа',
        'Сентября', 'Октября', 'Ноября', 'Декабря']

    return names[month]
}

export const isToday = (date: Date) => {
    const today = new Date()

    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

export const isYesterday = (date: Date) => {
    const today = new Date()

    return date.getDate() === today.getDate() - 1 &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

export const formatDate = <T>(obj: any): T => {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            formatDate(obj[key])
        } else {
            if (key === 'date') {
                obj[key] = new Date(obj[key])
            }
        }
    }

    return obj
}

export const getPrintTimeFormat = (time: Date) => {
    let hours = (time.getHours() >= 10) ? time.getHours() : `0${time.getHours()}`
    let minutes = (time.getMinutes() >= 10) ? time.getMinutes() : `0${time.getMinutes()}`

    return hours + ':' + minutes
}

export const dateTimeReviver = (key: string, value: any) => {
    let regex
    if (typeof value === 'string') {
        regex = /\/Date\((\d*)\)\//.exec(value)
        if (regex) {
            return new Date(+regex[1])
        }
    }
    return value
}