import { ListDto } from "@/types/ListDto"

type Props = {
    data: ListDto
    key: number
}
export default function List({ key, data }: Props) {
    return (
        <div>
            <img src={data.capturedPhoto} alt="" />
            <p>😐 {data.expressions.neutral}</p>
            <p>😆 {data.expressions.happy}</p>
            <p>😭 {data.expressions.sad}</p>
            <p>😠 {data.expressions.angry}</p>
            <p>🤪 {data.expressions.fearful}</p>
            <p>😲 {data.expressions.surprised}</p>
        </div>
    )
}
