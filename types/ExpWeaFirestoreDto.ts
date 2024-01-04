import { ExpressionsDto } from "./ExpressionsDto"

export type ExpWeaFirestoreDto = {
    capturedPhoto: string
    email: string
    expressions: ExpressionsDto
    weather: {
        location: string
        weather: string
        temperature: number
        humidity: number
        pressure: number
        icon: string
    }
}
