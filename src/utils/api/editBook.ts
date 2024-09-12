export default async function editBook({id, formData}: {
    id?: number,
    formData?: FormData
}) {
    const res = await fetch(`http://localhost:8000/api/books/${id}?_method=PUT`, {
        method: 'POST',
        body: formData
    })

    if(!res.ok) {
        throw new Error("erro put");
    }

    return;
}