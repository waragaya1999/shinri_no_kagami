import { ExpressionsDto } from "./ExpressionsDto"

export type ListDto = {
    date: Date
    weather: {
        temperature: number
        pressure: number
        humidity: number
        prefecture: string
        icon: string
    }
    expressions: ExpressionsDto
    capturedPhoto: string
}
