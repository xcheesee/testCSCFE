export default async function postBook(bookData: FormData) {
    const res = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: bookData
    })

    if(!res.ok) {
        throw new Error("bruh")
    }
    return;
}