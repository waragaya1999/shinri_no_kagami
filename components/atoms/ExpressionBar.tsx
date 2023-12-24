export default function ExpressionBar(expression: number) {
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
