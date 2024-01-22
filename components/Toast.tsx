type Props = {
    message: string
    animation: string
}
export default function Toast({ message, animation }: Props) {
    return (
        <div
            className={`absolute w-fit rounded-full bg-white bg-opacity-90 top-0 right-0 left-0 m-auto py-3 px-6 ${animation}`}
        >
            <p className={"text-sm"}>{message}</p>
        </div>
    )
}
