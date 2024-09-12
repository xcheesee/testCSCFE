import { useToast } from "@/hooks/use-toast"
import { Book } from "@/types/types"
import deleteBook from "@/utils/api/deleteBook"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function DelBookForm( {
    livro,
    onClick
}: {
    livro?: Book,
    onClick: () => void
}) {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const delMutation = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["books"]})
            toast({
                title: "Excluido com sucesso!"
            })
        }
    })

    return (
        <>
            <div>Deseja realmente Excluir o livro "{livro?.title}"</div>
            <button onClick={async () => {
                await delMutation.mutateAsync(livro?.id)
                onClick()
            }}>Sim</button>
        </>
    )
}