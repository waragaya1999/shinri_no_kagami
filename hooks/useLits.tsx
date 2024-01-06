import { ExpressionsDto } from "@/types/ExpressionsDto"

export const useList = () => {
    const icons = {
        neutral: "😐",
        happy: "😆",
        sad: "😭",
        angry: "😠",
        fearful: "🤪",
        disgusted: "😲",
        surprised: "🥳",
    }

    const formatExpressions = (expressions: ExpressionsDto): string[] => {
        const sortedExpressions = Object.entries(expressions)
            .sort((a, b) => b[1] - a[1])
            .map(
                (expression) =>
                    `${icons[expression[0] as keyof ExpressionsDto]}${
                        expression[1] * 100
                    } `,
            )

        return sortedExpressions
    }

    return { formatExpressions }
}
