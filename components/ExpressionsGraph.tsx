import { ExpressionsDto } from "@/types/ExpressionsDto"
import ExpressionBar from "@/components/atoms/ExpressionBar"
import ExpressionMark from "@/components/atoms/ExpressionMark"

type Props = {
    expressions: ExpressionsDto
}
export default function ExpressionsGraph({ expressions }: Props) {
    const maxExpressionKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a as keyof ExpressionsDto] >
        expressions[b as keyof ExpressionsDto]
            ? a
            : b,
    ) as keyof ExpressionsDto

    return (
        <div
            className={
                "fixed w-[86%] h-32 bg-blue-50 left-1/2 translate-x-[-50%] translate-y-[-120%] rounded-2xl"
            }
        >
            <div
                className={
                    "flex justify-between items-end w-full h-[70%] bg-gray-300 rounded-t-2xl"
                }
            >
                {ExpressionBar(
                    expressions.neutral,
                    maxExpressionKey === "neutral",
                )}
                {ExpressionBar(expressions.happy, maxExpressionKey === "happy")}
                {ExpressionBar(expressions.sad, maxExpressionKey === "sad")}
                {ExpressionBar(expressions.angry, maxExpressionKey === "angry")}
                {ExpressionBar(
                    expressions.fearful,
                    maxExpressionKey === "fearful",
                )}
                {ExpressionBar(
                    expressions.surprised,
                    maxExpressionKey === "surprised",
                )}
            </div>
            <div className={"w-full h-[30%]"}>
                <ul className={"flex w-full h-full"}>
                    {ExpressionMark("😐")}
                    {ExpressionMark("😆")}
                    {ExpressionMark("😭")}
                    {ExpressionMark("😠")}
                    {ExpressionMark("🤪")}
                    {ExpressionMark("😲")}
                </ul>
            </div>
        </div>
    )
}
