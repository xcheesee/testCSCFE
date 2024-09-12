export default async function postBook(bookData: FormData) {
    const res = await fetch(import.meta.env.VITE_API_URL + "/books", {
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
        throw new Error("Error POST")
    }
    return;
}