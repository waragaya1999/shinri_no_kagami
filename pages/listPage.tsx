import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"

export default function ListPage() {
    const { getList } = useFirestore()
    const list = getList()

    return (
        <>
            <div className={"relative z-10 p-4"}>
                {list &&
                    list.map((item, key) => <List key={key} data={item} />)}
            </div>
        </>
    )
}
