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

export const formatDate = (obj: any) => {
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