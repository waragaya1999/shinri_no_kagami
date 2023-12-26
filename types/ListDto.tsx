import { ExpressionsDto } from "./ExpressionsDto"

export type ListDto = {
    date: Date
    temperature: number
    pressure: number
    humidity: number
    location: string
    expressions: ExpressionsDto
    capturedPhoto: string
}
