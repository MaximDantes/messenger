const excludeSameId = <T extends {id: number}>(items: T[]): T[] => {
    return Array.from(new Set(items.map(item => item.id)))
        .map(id => items.find(item => item.id === id) || items[0])
}

export default excludeSameId