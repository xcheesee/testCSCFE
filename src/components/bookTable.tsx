import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import getBooks from '../utils/api/getBooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import IconPencil from '~icons/mdi/pencil'
import IconBin from '~icons/mdi/bin'
import { useState } from "react"
import { ApiBookFormError, Author, Book } from "@/types/types"
import FormDialog from "./formDialog"
import BookForm from "./bookForm"
import editBook from "@/utils/api/editBook"
import DelBookForm from "./delBookForm"
import AuthorDialog from "./authorDialog"
import { useToast } from "@/hooks/use-toast"


export default function BookTable({
  queryTitle
}: {
  queryTitle: string;
}) {

  const { toast } = useToast()

  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<ApiBookFormError|null>()
  const query = useQuery({
    queryKey: ['books', page, queryTitle],
    queryFn: () => getBooks({page, title: queryTitle})
  })

  const editMutation = useMutation({
    mutationFn: editBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
      setOpenForm(false)
      toast({
        title: "Editado com sucesso!",
        className: "rounded border-neutral-600"
      })
    },
    onError: (err) => {
      setError(err as unknown as ApiBookFormError)
    }
  })

  const [targetBook, setTargetBook] = useState<Book>()
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openAuthor, setOpenAuthor] = useState<boolean>(false)
  const [targetAuthor, setTargetAuthor] = useState<Author>()

  if(query.isLoading) return <></>
    return (
      <>
        <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Id</TableHead>
                <TableHead className="font-bold">Titulo</TableHead>
                <TableHead className="font-bold">Descricao</TableHead>
                <TableHead className="font-bold">Preco</TableHead>
                <TableHead className="font-bold text-center">Estoque</TableHead>
                <TableHead className="font-bold text-right" >Autor</TableHead>
                <TableHead className="font-bold text-center">Acao</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {query.data?.books.map((book => (
                <TableRow key={`book-${book.id}`}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.desc}</TableCell>
                  <TableCell>R$ {book.price}</TableCell>
                  <TableCell className="text-center">{book.stock}</TableCell>
                  <TableCell className="text-right " >
                    <div 
                      className={book.author ? "text-blue-500 hover:text-blue-800 cursos-pointer" : ""} 
                      onClick={() => {
                        if(!book?.author) return
                        setTargetAuthor(book.author)
                        setOpenAuthor(true)
                        }}>{book.author ? book.author.name : "N/A"}</div>
                    </TableCell>
                  <TableCell className="text-right flex max-md:flex-col gap-4 justify-center">
                    <button title="Edit" onClick={() => {
                      setTargetBook(book)
                      setOpenForm(true)
                    }
                    }><IconPencil /></button>
                    <button title="Delete" onClick={() => {
                      setTargetBook(book)
                      setOpenDelete(true)
                    }}><IconBin /></button>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => {
                if(page == 1) return
                setPage(prev => prev - 1);
              }} />
            </PaginationItem>
            {page !== 1 &&
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationLink >{page}</PaginationLink>
            </PaginationItem>
            {page !== query.data?.meta?.last_page &&
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationNext onClick={() => {
                if(page == query.data?.meta?.last_page) return
                setPage(prev => prev + 1)
              }}/>
            </PaginationItem>
          </PaginationContent>
      </Pagination>
      <FormDialog action="Editar" open={openForm} setOpen={setOpenForm} onClose={() => setError(null)}>
        <BookForm 
          errors={error}
          dftData={targetBook}
          isPending={editMutation.isPending}
          onSubmit={async (formData: FormData) => {
            setError(null)
            await editMutation.mutateAsync({id: targetBook?.id, formData })
          }}
        />
      </FormDialog>
      <FormDialog action="Excluir" open={openDelete} setOpen={setOpenDelete}><DelBookForm livro={targetBook} onClick={() => setOpenDelete(false)}/></FormDialog>
      <AuthorDialog open={openAuthor} setOpen={setOpenAuthor} author={targetAuthor} />
      </>
    )
}