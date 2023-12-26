import { ExpressionsDto } from "@/types/ExpressionsDto"
import ExpressionBar from "@/components/atoms/ExpressionBar"
import ExpressionMark from "@/components/atoms/ExpressionMark"

type Props = {
    expressions: ExpressionsDto
}
export default function ExpressionsGraph({ expressions }: Props) {
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
                {ExpressionBar(expressions.neutral)}
                {ExpressionBar(expressions.happy)}
                {ExpressionBar(expressions.sad)}
                {ExpressionBar(expressions.angry)}
                {ExpressionBar(expressions.fearful)}
                {ExpressionBar(expressions.surprised)}
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
