import { Author } from "./author"
import { Publisher } from "./publisher"
import { Shelf } from "./shelf"
import { StatusType } from "./status.type"

export interface Book {
    id: number,
    title: string,
    author: Author,
    publisher: Publisher,
    shelf: Shelf,
    statusType: StatusType
}