import './App.css'
import BookTable from './components/bookTable'
import IconAdd from "~icons/mdi/add"
import FormDialog from './components/formDialog'
import BookForm from './components/bookForm'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postBook from './utils/api/postBook'
import { ApiBookFormError } from './types/types'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from './hooks/use-toast'
import { Input } from './components/ui/input'

function App() {

  const { toast } = useToast()

  const queryClient = useQueryClient()
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [queryTitle, setQueryTitle] = useState<string>("")
  const [err, setErr] = useState<ApiBookFormError|null>()
  const postMutation = useMutation({
    mutationFn: postBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
    onError: (e) => {
      setErr(e as unknown as ApiBookFormError)
    }
  })


  return (
    <div className='grid w-full gap-36 justify-items-center'>
      <div className='flex justify-center text-6xl font-bold py-2'>WLib</div>
      <div className='grid w-[min(100%,1024px)] flex-auto gap-8 px-4'>
        <div className='grid grid-cols-[1fr_max-content] gap-4 items-center'>
        <Input placeholder='Pesquisa por Titulo' className='rounded border-neutral-600' value={queryTitle} onChange={(e) => setQueryTitle(e.target.value)}/>
        <div className='flex md:justify-end'><button className='flex justify-center items-center gap-4 max-md:grow' onClick={() => setOpenForm(true)}>Adicionar Livro<IconAdd/></button></div>
        </div>
        <BookTable queryTitle={queryTitle} />
      </div>
      <FormDialog action="Enviar" open={openForm} setOpen={setOpenForm} onClose={() => setErr(null)}>
        <BookForm 
          isPending={postMutation.isPending}
          onSubmit={async (formData: FormData) => {
            await postMutation.mutateAsync(formData)
            setOpenForm(false);
            toast({
              title: "Criado com sucesso!",
              className: "rounded border-neutral-600"
            })
          }}
          errors={err}

          />
      </FormDialog>
      <Toaster />
    </div>
  )
}

export default App
