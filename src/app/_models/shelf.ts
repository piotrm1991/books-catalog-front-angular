import { Room } from "./room";

export interface Shelf {
    id: number;
    letter: string;
    number: number;
    room: Room;
}