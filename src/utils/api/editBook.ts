export default async function editBook({id, formData}: {
    id?: number,
    formData?: FormData
}) {
    const res = await fetch(`http://localhost:8000/api/books/${id}?_method=PUT`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })

    if(res.status == 422) {
        throw await res.json()
    }

    if(!res.ok) {
        throw new Error("error PUT");
    }

    return;
}