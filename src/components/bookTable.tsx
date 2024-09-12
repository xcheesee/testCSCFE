import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Book } from "@/types/types"

export default function BookTable(
  {
    books
  }: {
    books?: Book[]
  }) {
    return (
        <Table className="max-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Id</TableHead>
                <TableHead className="font-bold">Titulo</TableHead>
                <TableHead className="font-bold">Descricao</TableHead>
                <TableHead className="font-bold">Preco</TableHead>
                <TableHead className="font-bold text-center">Estoque</TableHead>
                <TableHead className="font-bold text-right">Autor</TableHead>
                <TableHead className="font-bold text-right">Acao</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.map((book => (
                <TableRow>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.desc}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell className="text-center">{book.stock}</TableCell>
                  <TableCell className="text-right">{book.author ? book.author.name : "N/A"}</TableCell>
                  <TableCell className="text-right">{book.author ? book.author.name : "N/A"}</TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
    )
}