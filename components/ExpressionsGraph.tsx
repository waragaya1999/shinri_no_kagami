import { ExpressionsDto } from "@/types/ExpressionsDto"
import React from "react"

type Props = {
    expressions: ExpressionsDto
}
export default function ExpressionsGraph({ expressions }: Props) {
    const expressionBar = (expression: number) => {
        return (
            <div className={"flex justify-center items-end w-1/6 h-[90%]"}>
                <div
                    className={"w-1/3 bg-gray-400 rounded-t"}
                    style={{
                        height: `${expression * 100}%`,
                    }}
                ></div>
            </div>
        )
    }
    const expressionMark = (emoji: string) => {
        return (
            <li className={"flex w-1/6 items-center justify-center text-2xl"}>
                {emoji}
            </li>
        )
    }

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
                {expressionBar(expressions.neutral)}
                {expressionBar(expressions.happy)}
                {expressionBar(expressions.sad)}
                {expressionBar(expressions.angry)}
                {expressionBar(expressions.fearful)}
                {expressionBar(expressions.surprised)}
            </div>
            <div className={"w-full h-[30%]"}>
                <ul className={"flex w-full h-full"}>
                    {expressionMark("😐")}
                    {expressionMark("😆")}
                    {expressionMark("😭")}
                    {expressionMark("😠")}
                    {expressionMark("🤪")}
                    {expressionMark("😲")}
                </ul>
            </div>
        </div>
    )
}
