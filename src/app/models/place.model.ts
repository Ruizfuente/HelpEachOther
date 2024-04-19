import { Coordinates } from "./coordinates.model";

export class Place {
    id: number;
    name: string;
    description: string;
    type: string;
    date: string;
    coordinates: Coordinates;
    user_id: number;

    constructor(
        id: number, name: string,
        description: string, type: string,
        coordinates: Coordinates,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.coordinates = coordinates;
    }
}