import { useLogin } from "@/hooks/useFirestore"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import List from "@/components/List"

export default function ListPage() {
    const { getList } = useLogin()
    const list = getList()

    return (
        <>
            <Header />
            <div className={"relative z-10 p-4"}>
                {list &&
                    list.map((item, index) => (
                        <List index={index} data={item} />
                    ))}
            </div>
            <Footer />
        </>
    )
}
