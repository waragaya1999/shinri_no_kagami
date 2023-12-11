import { useState } from "react"
import { ExpressionsDto } from "@/types/ExpressionsDto"

export const useIndexState = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    const [expressions, setExpressions] = useState<ExpressionsDto>({
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
    })

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    const handleExpressions = (expressions: ExpressionsDto) => {
        setExpressions({
            neutral: Number(expressions.neutral.toFixed(3)),
            happy: Number(expressions.happy.toFixed(3)),
            sad: Number(expressions.sad.toFixed(3)),
            angry: Number(expressions.angry.toFixed(3)),
            fearful: Number(expressions.fearful.toFixed(3)),
            disgusted: Number(expressions.disgusted.toFixed(3)),
            surprised: Number(expressions.surprised.toFixed(3)),
        })
    }

    return { expressions, windowSize, handleResize, handleExpressions } as const
}
