import { ExpressionsDto } from "./ExpressionsDto"

export type ListDto = {
    date: string
    weather: {
        temperature: number
        pressure: number
        humidity: number
        location: string
        icon: string
    }
    expressions: ExpressionsDto
    capturedPhoto: string
}
