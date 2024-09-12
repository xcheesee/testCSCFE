import { Book } from "@/types/types";
import { Input } from "@/components/ui/input"

export default function BookForm({
    dftData,
    onSubmit
}: {
    dftData?: Book,
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
        <Input defaultValue={dftData?.title ?? ""} className="rounded" name="title" placeholder="Title"/>
        <Input defaultValue={dftData?.desc ?? ""} className="rounded" name="desc" placeholder="description"/>
        <Input defaultValue={dftData?.price ?? ""} className="rounded" name="price" placeholder="Preco"/>
        <Input defaultValue={dftData?.stock ?? ""} className="rounded" name="stock" placeholder="stock"/>
        <Input defaultValue={dftData?.author?.name} className="rounded" name="author" placeholder="Autor"/>
        <button type="submit">Enviar</button>
    </form>
)

}