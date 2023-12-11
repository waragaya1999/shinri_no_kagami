export type expWheFirestoreDto = {
    faceImage: string
    expressions: {
        angry: number
        disgusted: number
        fearful: number
        happy: number
        neutral: number
        sad: number
        surprised: number
    }
    whether: {
        location: string
        whether: string
        temp: number
        humidity: number
        pressure: number
    }
}
