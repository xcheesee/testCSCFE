export default async function deleteBook(id?: number) {
    const res = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: 'DELETE'
    })

    if(!res.ok) {
        throw new Error('error DELETE');
    }

    return;
}