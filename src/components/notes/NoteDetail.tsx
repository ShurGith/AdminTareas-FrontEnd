import { useAuth } from '@/hooks/useAuth';
import { Note } from '@/types'
import { formatDate } from '@/utils/utils'
import { useMemo } from 'react';
import { AiFillDelete } from 'react-icons/ai';
type NoteDetailProps = { 
  note: Note,
  index:number
 }

function NoteDetail({note, index}: NoteDetailProps) {
  const {data, isLoading} = useAuth()
  const canDelete = useMemo(()=> data?._id === note.createdBy._id, [data]);
    
if(isLoading || !data){
    return "Cargando... 🔃";
  }
  return (
    <div key={note._id} 
                  className={`pb-4 pt-2 border-l-8  pl-4 flex justify-between
                    ${index % 2 === 0 ? 'bg-gray-50 border-l-gray-500' : 'border-l-gray-200'}`}>
          <div>
                  <p>{note.content}</p>
                  <p>  por: <span className="font-bold">{note.createdBy.name}</span></p>
                  <time className="text-sm leading-none text-gray-500">{formatDate(note.createdAt)}</time>
            </div>
            <div className='my-auto'>
            {canDelete && (
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-red-400 hover:bg-red-500 p-2 text-xs text-white hover:text-black font-bold cursor-pointer transition-colors"
                    onClick={() => {console.log("eliminar")}}
                >
                <AiFillDelete className='w-6 h-6 mr-2' />
                  Eliminar</button>
            )}
            </div>
      </div>
  )
}

export default NoteDetail