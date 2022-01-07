export const formatDate = (obj: any) => ({
    ...obj,
    date: new Date(obj.date)
})