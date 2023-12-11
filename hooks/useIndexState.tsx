import { useState } from "react"
import { ExpressionsDto } from "@/types/ExpressionsDto"

export const useIndexState = () => {
    const [expressions, setExpressions] = useState<ExpressionsDto>({
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
    })

    const handleExpressions = (expressions: ExpressionsDto) => {
        setExpressions({
            neutral: Number(expressions.neutral.toFixed(2)),
            happy: Number(expressions.happy.toFixed(2)),
            sad: Number(expressions.sad.toFixed(2)),
            angry: Number(expressions.angry.toFixed(2)),
            fearful: Number(expressions.fearful.toFixed(2)),
            disgusted: Number(expressions.disgusted.toFixed(2)),
            surprised: Number(expressions.surprised.toFixed(2)),
        })
    }

    return { expressions, handleExpressions } as const
}
