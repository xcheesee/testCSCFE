import { ApiBookFormError, Book } from "@/types/types";
import { Input } from "@/components/ui/input"

export default function BookForm({
    dftData,
    errors,
    onSubmit
}: {
    dftData?: Book,
    errors?: ApiBookFormError|null,
    onSubmit: (formData: FormData) => void
}) {

    return(
    <form 
        className="grid gap-4"
        onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        console.log(formData)
        onSubmit(formData)
    }}>
        <Input 
            defaultValue={dftData?.title ?? ""} 
            className={`rounded ${errors?.errors?.title ? "border-red-600" : ""}`}
            name="title" 
            placeholder="Title"
        />
        {errors?.errors?.title && <div className="text-red-500">{errors?.errors?.title}</div>}
        <Input 
            defaultValue={dftData?.desc ?? ""} 
            className="rounded" 
            name="desc" 
            placeholder="description"
        />
        <Input 
            defaultValue={dftData?.price ?? ""} 
            className={`rounded ${errors?.errors?.price ? "border-red-600" : ""}`}
            name="price" 
            placeholder="Preco"
        />
        {errors?.errors?.price && <div className="text-red-500">{errors?.errors?.price}</div>}
        <Input 
            defaultValue={dftData?.stock ?? ""} 
            className={`rounded ${errors?.errors?.stock ? "border-red-600" : ""}`}
            name="stock" 
            placeholder="stock"
        />
        {errors?.errors?.stock && <div className="text-red-500">{errors?.errors?.stock}</div>}
        <Input 
            defaultValue={dftData?.author?.name} 
            className="rounded" 
            name="author" 
            placeholder="Autor"
        />
        <button type="submit">Enviar</button>
    </form>
)

}