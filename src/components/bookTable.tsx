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
import { Book } from "@/types/types"
import FormDialog from "./formDialog"
import BookForm from "./bookForm"
import editBook from "@/utils/api/editBook"

export default function BookTable() {

  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['books'],
    queryFn: getBooks
  })

  const editMutation = useMutation({
    mutationFn: editBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    }
  })

  const [targetBook, setTargetBook] = useState<Book>()
  const [openForm, setOpenForm] = useState<boolean>(false)

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
                <TableHead className="font-bold text-right">Autor</TableHead>
                <TableHead className="font-bold text-center">Acao</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {query.data?.map((book => (
                <TableRow key={`book-${book.id}`}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.desc}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell className="text-center">{book.stock}</TableCell>
                  <TableCell className="text-right">{book.author ? book.author.name : "N/A"}</TableCell>
                  <TableCell className="text-right flex gap-4 justify-center">
                    <button title="Edit" onClick={() => {
                      setTargetBook(book)
                      setOpenForm(true)
                    }
                    }><IconPencil /></button>
                    <button title="Delete"><IconBin /></button>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
      </Pagination>
      <FormDialog action="Editar" open={openForm} setOpen={setOpenForm} >
        <BookForm 

          dftData={targetBook}
          onSubmit={async (formData: FormData) => {
            await editMutation.mutateAsync({id: targetBook?.id, formData })
            setOpenForm(false);
          }}
        />
      </FormDialog>
      </>
    )
}