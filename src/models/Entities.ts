export interface Person {
    id: string,
    roomId: string,
    groupId: string,
    name: string,
    isChecked: boolean
}

export interface Group {
    id: string,
    roomId: string,
    name: string,
    price: number,
    count: number,
    persons: Person[]
}

export interface Room {
    id: string,
    createDate: Date,
    name: string
}