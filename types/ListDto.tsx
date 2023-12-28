import { ExpressionsDto } from "./ExpressionsDto"

export type ListDto = {
    date: Date
    temperature: number
    pressure: number
    humidity: number
    prefecture: string
    expressions: ExpressionsDto
    capturedPhoto: string
    icon: string
}
