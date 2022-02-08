export interface IApiChat {
    readonly id: number
    readonly title: string
    readonly lastMessage: {
        readonly id: number,
        readonly text: string,
        readonly date: Date
        readonly user: {
            readonly avatar: string,
        },
    }
    readonly cover: string
}