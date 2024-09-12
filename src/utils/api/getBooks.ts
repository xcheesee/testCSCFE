import { BookApiResponse } from "@/types/types"

export default async function getBooks(page: number): Promise<BookApiResponse> {
    const res = await fetch(`http://localhost:8000/api/books?page=${page}`)
    if(!res.ok) {
        throw new Error("error GET")
    }
    const json = await res.json()

    return {books: json.data, meta: json.meta}
}