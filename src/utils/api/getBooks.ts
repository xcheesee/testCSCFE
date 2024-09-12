export default async function getBooks(page: number): Promise<any> {
    const res = await fetch(`http://localhost:8000/api/books?page=${page}`)
    if(!res.ok) {
        throw new Error("froggers")
    }

    const json = await res.json()



    return {books: json.data, meta: json.meta}
}