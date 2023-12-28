import { ExpressionsDto } from "./ExpressionsDto"

export type ExpWeaFirestoreDto = {
    faceImage: string
    email: string
    expressions: ExpressionsDto
    weather: {
        location: string
        weather: string
        temp: number
        humidity: number
        pressure: number
    }
}
