export default function ExpressionBar(expression: number, isMax: boolean) {
    const barClassName = `w-1/3 rounded-t ${
        isMax ? "bg-red-600" : "bg-gray-400"
    }`

    return (
        <div className="flex justify-center items-end w-1/6 h-[90%]">
            <div
                className={barClassName}
                style={{
                    height: `${expression * 100}%`,
                }}
            ></div>
        </div>
    )
}
