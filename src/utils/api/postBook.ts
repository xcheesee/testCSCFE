export default async function postBook(bookData: FormData) {
    console.log(bookData)
    const res = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: bookData,
        headers: {
            "Accept": "application/json"
        }
    })

    if(res.status == 422) {
        throw await res.json()
    }

    if(!res.ok) {
        throw new Error("bruh")
    }
    return;
}