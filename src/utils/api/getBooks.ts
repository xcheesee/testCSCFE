import { Book } from "@/types/types"

export default async function getBooks(): Promise<Book[]> {
    const res = await fetch("http://localhost:8000/api/books")
    if(!res.ok) {
        throw new Error("froggers")
    }

    const json = await res.json()



    return json.data as Book[]
}