import { useQuery } from '@tanstack/react-query'
import './App.css'
import getBooks from './utils/api/getBooks'
import BookTable from './components/bookTable'

function App() {

  const query = useQuery({
    queryKey: ['books'],
    queryFn: getBooks
  })


  return (
    <div className='flex flex-col w-full content-center justify-center gap-36'>
      <div className='flex justify-center text-6xl font-bold py-2'>WLib</div>
      {query.isLoading 
       ? <></>
       : <BookTable books={query?.data} />
      }
      
    </div>
  )
}

export default App
