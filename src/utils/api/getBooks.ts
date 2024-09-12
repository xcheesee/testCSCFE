import { BookApiResponse } from "@/types/types"

export default async function getBooks(page: number): Promise<BookApiResponse> {
    const res = await fetch(import.meta.env.VITE_API_URL + `/books?page=${page}`)
    if(!res.ok) {
        throw new Error("error GET")
    }
    const json = await res.json()

    return {books: json.data, meta: json.meta}
}